import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { procedures } from "@/api";
import { env } from "@/lib/env";
import { setRpcContext, clearRpcContext } from "@/lib/rpc-context";
import { getImageStream } from "@/lib/s3";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.post("/api", (req, res) => {
  setRpcContext(req);
  const body = req.body as { method: string; params?: unknown[] };
  const fn = procedures[body.method as keyof typeof procedures] as
    | ((...args: unknown[]) => Promise<unknown>)
    | undefined;
  if (!fn) return res.status(404).json({ error: "Method not found" });
  fn(...(body.params ?? []))
    .then((result) => {
      clearRpcContext();
      res.json(result);
    })
    .catch((err: Error) => {
      clearRpcContext();
      res.status(500).json({ error: err.message });
    });
});

app.get(["/logo.png", "/about-team.png", "/clients/:file"], async (req, res) => {
  const key = req.path.startsWith("/") ? req.path.slice(1) : req.path;
  try {
    const s3res = await getImageStream(key);
    if (!s3res?.Body) return res.status(404).end();
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    if (s3res.ContentType) res.set("Content-Type", s3res.ContentType);
    (s3res.Body as NodeJS.ReadableStream).pipe(res);
  } catch {
    res.status(404).end();
  }
});

if (env.VITE_NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (_req, res) => res.sendFile("dist/index.html", { root: "." }));
}

app.listen(Number(env.PORT), () => {
  console.log(`API server running on port ${env.PORT}`);
});

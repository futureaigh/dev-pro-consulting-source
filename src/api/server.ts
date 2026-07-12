import express from "express";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { procedures } from "@/api";
import { env } from "@/lib/env";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.post("/api", (req, res) => {
  const body = req.body as { method: string; params?: unknown[] };
  const fn = procedures[body.method as keyof typeof procedures] as
    | ((...args: unknown[]) => Promise<unknown>)
    | undefined;
  if (!fn) return res.status(404).json({ error: "Method not found" });
  fn(...(body.params ?? []))
    .then((result) => res.json(result))
    .catch((err: Error) => res.status(500).json({ error: err.message }));
});

if (env.VITE_NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (_req, res) => res.sendFile("dist/index.html", { root: "." }));
}

app.listen(Number(env.PORT), () => {
  console.log(`API server running on port ${env.PORT}`);
});

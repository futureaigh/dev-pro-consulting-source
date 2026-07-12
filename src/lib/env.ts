import { z } from "zod";

const publicSchema = z.object({
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  VITE_NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const serverSchema = z.object({
  PORT: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  S3_ENDPOINT: z.string().optional().default(""),
  S3_ACCESS_KEY_ID: z.string().optional().default(""),
  S3_SECRET_ACCESS_KEY: z.string().optional().default(""),
  S3_BUCKET: z.string().optional().default(""),
  S3_REGION: z.string().optional().default("auto"),
});

const schema = serverSchema.extend(publicSchema.shape);

const metaEnv = import.meta.env;

const isServer = metaEnv?.SSR || typeof process !== "undefined";

const schemaToCheck = isServer ? schema : publicSchema;

const parsed = schemaToCheck.safeParse(isServer ? process?.env : metaEnv);

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

const proxy = new Proxy(parsed.data, {
  get(target, prop) {
    if (isServer || String(prop).startsWith("VITE_")) {
      return target[prop as keyof typeof target];
    }
    throw new Error(
      `Attempted to access server-side environment variable "${String(prop)}" from the client-side.`,
    );
  },
});

export const env = proxy as z.infer<typeof schema>;

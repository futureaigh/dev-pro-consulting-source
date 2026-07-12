import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";

let client: S3Client | null = null;

function getClient() {
  if (!env.S3_ENDPOINT || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) return null;
  if (!client) {
    client = new S3Client({
      endpoint: env.S3_ENDPOINT,
      region: env.S3_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: false,
    });
  }
  return client;
}

export async function getImageStream(key: string) {
  const c = getClient();
  if (!c) return null;
  const result = await c.send(new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: key }));
  return result;
}

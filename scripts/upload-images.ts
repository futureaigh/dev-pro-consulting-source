import { readFile, readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION || "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: false,
});

const BUCKET = process.env.S3_BUCKET!;
const PUBLIC = join(import.meta.dirname, "..", "public");

async function uploadFile(filePath: string, key: string) {
  const ext = extname(filePath).toLowerCase();
  const buffer = await readFile(filePath);

  let body: Buffer;
  let contentType: string;

  if (ext === ".png") {
    body = await sharp(buffer).png({ quality: 80, compressionLevel: 9 }).toBuffer();
    contentType = "image/png";
  } else if (ext === ".jpg" || ext === ".jpeg") {
    body = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
    contentType = "image/jpeg";
  } else {
    body = buffer;
    contentType = ext === ".svg" ? "image/svg+xml" : "application/octet-stream";
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  const before = (await stat(filePath)).size;
  const after = body.length;
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(`  ${key}  ${fmt(before)} → ${fmt(after)} (${saved}% saved)`);
}

function fmt(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  console.log("Uploading images to S3...\n");

  // logo
  await uploadFile(join(PUBLIC, "logo.png"), "logo.png");

  // about-team
  await uploadFile(join(PUBLIC, "about-team.png"), "about-team.png");

  // client logos
  const clientDir = join(PUBLIC, "clients");
  const files = await readdir(clientDir);
  for (const file of files.sort()) {
    await uploadFile(join(clientDir, file), `clients/${file}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});

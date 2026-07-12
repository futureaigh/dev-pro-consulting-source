import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export async function saveBase64File(base64: string, filename: string, dir = "/cdn") {
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(base64, "base64");
  const path = join(dir, filename);
  await writeFile(path, buffer);
  return path;
}

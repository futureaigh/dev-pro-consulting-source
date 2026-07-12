# Implementation Plan: S3 Bucket for Images

Railway buckets are private — no public direct URLs. Images are proxied through Express.

## Steps

### 1. Create bucket + get credentials
```bash
railway bucket create devpro-consult-images
railway bucket credentials devpro-consult-images
```
Returns: `endpoint`, `accessKeyId`, `secretAccessKey`, `bucketName`, `region`.

### 2. Add creds to Railway env + local `.env.development`
```
S3_ENDPOINT=https://storage.railway.app
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_BUCKET=devpro-consult-images
S3_REGION=auto
```

### 3. Write upload script (`scripts/upload-images.ts`)
- Reads `public/logo.png`, `public/about-team.png`, `public/clients/*.png`
- Compresses with `sharp` (quality 80, png to avif/webp as well)
- Uploads to S3 via `@aws-sdk/client-s3`
- Prints mapping: local path → S3 key

### 4. Add S3 proxy middleware to Express
In `src/api/server.ts`, before the static file handler, add a route that:
- Intercepts requests for known image paths (`/logo.png`, `/about-team.png`, `/clients/*.png`)
- Streams from S3 with `Cache-Control: public, max-age=31536000`
- Falls back to local `public/` if S3 is not configured (dev)

### 5. No frontend changes needed
Same URLs (`/logo.png`, `/clients/client-01.png`). Express proxy handles the S3 fetch transparently.

### 6. Remove images from git (keep favicon)
Add `public/*.png` and `public/clients/*.png` to `.gitignore`, keep `favicon.png` via exception.

## Order
```
1 → 2 → 3 → 4 → 5 → 6
```

Depends: `@aws-sdk/client-s3`, `sharp` (dev for script).

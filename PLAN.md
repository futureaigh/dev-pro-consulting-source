# Implementation Plan: Transform to alpha-damz Stack

## Current vs Target

| Area | Current | Target (alpha-damz) |
|------|---------|---------------------|
| Package manager | npm | **pnpm** |
| Database ORM | Prisma + SQLite | **Drizzle ORM + Turso** |
| RPC framework | `@adaptive-ai/sdk` (wraps Hono) | **typed-rpc** + Express |
| Auth | None | **Clerk** (`@clerk/clerk-react`, `@clerk/express`) |
| Admin panel | None | Admin routes with RBAC via `publicMetadata` |
| Uploads | None | Local volume (`/cdn`) served via Express |

## Steps

### 1. Switch to pnpm
- Delete `package-lock.json`, `.npmrc`
- Run `pnpm install` (reuses existing `package.json`)

### 2. Swap Prisma → Drizzle + Turso
- Remove: `schema.prisma`, `migrations/`, `generated/`, Prisma deps from `package.json`
- Add: `drizzle-orm`, `@tursodatabase/libsql-client`, `drizzle-kit`
- Create `src/db/schema.ts` with Drizzle schema (User model + new ones below)
- Create `src/db/index.ts` with Turso connection
- Remove `src/api/db.ts`, replace with Drizzle client

### 3. Unwrap `@adaptive-ai/sdk` → raw typed-rpc + Express
- Remove `@adaptive-ai/sdk` dep
- Add `typed-rpc`, `express`, `@types/express`
- Rewrite `src/api/server.ts` to Express + `handleRpc` from typed-rpc
- Rewrite `src/lib/client.ts` to plain `typed-rpc` client
- Keep `src/api/procedures.ts` shape (just change server plumbing)

### 4. Add Clerk auth
- Add `@clerk/clerk-react`, `@clerk/express`
- Wrap app in `<ClerkProvider>` in `src/main.tsx`
- Add `.env` vars: `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Add auth middleware to Express: `getAuth(req)` from Clerk

### 5. Add DB models
- `contacts` table (for contact form submissions)
- Expand `users` table if needed
- Any other tables for publications/services if making them dynamic

### 6. Wire contact form to backend
- Add `submitContact` procedure in `src/api/procedures.ts`
- Call it from `src/pages/Contact.tsx`

### 7. Admin panel + RBAC
- Create `src/components/AdminProtectedRoute.tsx`
- Check `user?.publicMetadata?.role === 'admin'`
- Backend guard: `getAdminUser()` that re-fetches metadata from Clerk API
- Create `src/pages/admin/` routes for managing content

### 8. Upload utility
- Create `src/lib/upload.ts` — accepts base64, writes to local volume
- Serve `/cdn` via `express.static` in `server.ts`

### 9. Deploy to Railway
- Add `railway.json` if needed
- Set Turso + Clerk env vars in Railway dashboard
- Mount persistent volume for `/cdn`

## Ordering

```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
```

Steps 2, 3, 4 can be parallelized (they touch independent files). Step 5 depends on 2.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# mywedding

Wedding planning app: Next.js 16 App Router, React 19, Tailwind v4, better-auth, MongoDB. Early-stage scaffold — `src/app/page.tsx` and `src/components/Header.tsx` are placeholders.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run lint` — bare `eslint` across the repo (flat config: `eslint.config.mjs`)
- No test runner and no typecheck script. Run `npx tsc --noEmit`.
- No CI or pre-commit hooks; verify changed code with `npx tsc --noEmit`, `npm run lint`, and `npm run build` when routes/server code changed.

## Framework

- Read `node_modules/next/dist/docs/` before using Next.js APIs; this major version differs from most training data.
- Never edit inside `<!-- BEGIN:nextjs-* -->` blocks in this file — `next dev` rewrites them.

## Setup

- `.env` is gitignored. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- A local MongoDB must be running: `src/lib/auth.ts` hard-codes `mongodb://localhost:27017/database` and DB name `mywedding` (not env-driven).
- Google OAuth redirect URI is `http://localhost:3000/api/auth/callback/google` (catch-all route at `src/app/api/auth/[...all]/route.ts`).
- `BETTER_AUTH_URL` lacks the `NEXT_PUBLIC_` prefix, so it is `undefined` in browser code even though `src/lib/auth-client.ts` reads it there.

## Auth

- Server config: `src/lib/auth.ts` (email/password + Google). Client helpers: `src/lib/auth-client.ts`; import `authClient`/`signIn`/`signUp`/`useSession` from there.
- `auth-client.ts` calls `createAuthClient()` twice: the exported `signIn`/`signUp`/`useSession` come from the second, unconfigured call, so `baseURL` is ignored for them. Update both calls or consolidate.

## Dependencies

- `mongo-adapter` in `package.json` is unused. `src/lib/auth.ts` imports `@better-auth/mongo-adapter`, which currently resolves only as a transitive dependency of `better-auth` — declare it directly before relying on it.

## Styling

- Tailwind v4: no `tailwind.config.*` and no PostCSS config. Entry is `@import "tailwindcss"` in `src/app/globals.css`, processed by `@tailwindcss/turbopack` through `turbopack.rules` in `next.config.ts`.
- Path alias `@/*` maps to `src/*`.
- Root layout applies Manrope globally and renders `Header` on every page.

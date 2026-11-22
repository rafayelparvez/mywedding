<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# mywedding

Wedding planning marketplace: Next.js 16 App Router, React 19, Tailwind v4, better-auth, MongoDB. Homepage (`Banner`), `Header`, `Footer`, and email/password auth (`/login`, `/register`) are built. `README.md` is stock create-next-app boilerplate — trust this file and the config instead.

## Commands

- `npm run dev` — starts Turbopack dev server at http://localhost:3000
- `npm run build` — produces production build (`.next/`)
- `npm run start` — serves production build
- `npm run lint` — bare `eslint` via flat config (`eslint.config.mjs`); note: `next lint` was removed in Next 16
- No dedicated test runner or `typecheck` script: run `npx tsc --noEmit` to type-check
- Before finishing any routes/server code: run `npx tsc --noEmit && npm run lint && npm run build`

## Framework (Next.js 16)

- Read `node_modules/next/dist/docs/` before using Next.js APIs; this major differs from most training data.
- Request APIs are async: `params`/`searchParams` are `Promise`s and must be awaited.
- `middleware.ts` is deprecated in favor of `proxy.ts` (exported function `proxy`).
- Turbopack is the default; Tailwind is wired through `turbopack.rules` in `next.config.ts`, not PostCSS.
- Never edit inside `<!-- BEGIN:nextjs-* -->` blocks in `next.config.ts` — `next dev` rewrites them.

**Compiler note**: `tsc --noEmit` is the typecheck entrypoint; there is no `next typecheck`.

## Setup

- `.env` is gitignored. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URI`. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are optional; Google sign-in is disabled unless both are set.
- MongoDB must be reachable; `src/lib/auth.ts` reads the URI from `BETTER_AUTH_DB_URI` and hard-codes the DB name `mywedding`.
- Google OAuth redirect URI is `http://localhost:3000/api/auth/callback/google`; the handler is the catch-all route at `src/app/api/auth/[...all]/route.ts`.

## Auth

- Server config: `src/lib/auth.ts` (email/password + optional Google). Client helpers: `src/lib/auth-client.ts`; import `authClient`/`signIn`/`signUp`/`signOut`/`useSession` from there.
- `src/lib/roles.ts` is the shared role source: `user`, `vendor`, `admin`. `role` is a Better Auth `user.additionalFields` entry with `input: false`; the public form sends `requestedRole`, and `databaseHooks.user.create.before` maps it to `user`/`vendor` (anything else becomes `user`). Admins must be promoted directly in MongoDB, and `/update-user` cannot change roles.
- `inferAdditionalFields<typeof auth>()` in `auth-client.ts` exposes `role` on `useSession().data.user.role`.
- Registration stores the uploaded avatar as a resized JPEG data URL in Better Auth's built-in `user.image` (`src/lib/avatar.ts`); there is no file-storage service.
- `(auth)` is a route group: `src/app/(auth)/login/page.tsx` is a server wrapper that passes `googleEnabled` to `LoginForm.tsx`; `register/page.tsx` is the client form.

## Dependencies

- `mongo-adapter` in `package.json` is unused. `src/lib/auth.ts` imports `@better-auth/mongo-adapter`, which currently resolves only as a transitive dependency of `better-auth` — declare it directly before relying on it.

## Styling

- Tailwind v4: no `tailwind.config.*` and no PostCSS config. Entry is `@import "tailwindcss"` in `src/app/globals.css`, processed by `@tailwindcss/turbopack` via `turbopack.rules` in `next.config.ts`.
- No theme tokens: brand colors are hard-coded arbitrary values across components (`#D81B7E`/`#FA4796` magenta, `#190C24`/`#120A18` dark). Follow that pattern unless asked to introduce tokens.
- Path alias `@/*` maps to `src/*`.
- Root layout applies Manrope globally and renders `Header` and `Footer` on every page.

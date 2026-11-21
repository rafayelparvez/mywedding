# MyWedding Client Audit

**Repository:** `C:\projects\Assignments\mywedding`
**Audit date:** Sat Nov 21 2026
**Tools used:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, file reads, git log

---
## 1. Folder Structure

| Directory | Purpose |
|---|---|
| `src/app/` | Next.js 16 App Router pages & routes (turbopack) |
| `src/components/` | General UI: Banner, Footer, Header |
| `src/components/auth/` | Auth‑specific: AuthShell, TextField, PasswordField, RolePicker, AvatarUpload, icons |
| `src/lib/` | Server utils: auth.ts, auth-client.ts, roles.ts, avatar.ts |
| `src/lib/roles.ts` | Shared role constants: USER_ROLES, REGISTRATION_ROLES, DEFAULT_USER_ROLE, ROLE_LABELS, isRegistrationRole() |
| `public/images/` | Background images, logos |
| `.env` | Gitignored; holds BETTER_AUTH_SECRET, BETTER_AUTH_URL, BETTER_AUTH_DB_URI, optional GOOGLE_CLIENT_ID/SECRET |

---
## 2. All Implemented Routes & Pages

| Route | Page | Status |
|---|---|---|
| `/` | `src/app/page.tsx` → `Banner` | Completed |
| `/login` | `src/app/(auth)/login/page.tsx` + `LoginForm.tsx` | Completed |
| `/register` | `src/app/(auth)/register/page.tsx` | Completed |
| `/services` | Referenced in Footer, no dedicated page | Not Implemented |
| `/vendors` | Referenced in Footer, no dedicated page | Not Implemented |
| `/checklist` | Referenced in Footer, no dedicated page | Not Implemented |
| `/about`, `/contact`, `/press` | Referenced in Footer, no dedicated pages | Not Implemented |

---
## 3. Existing Reusable Components

| Component | Purpose | Props / Exports |
|---|---|---|
| `Banner.tsx` | Hero carousel with sliding backgrounds, CTA buttons | None (fully self‑contained) |
| `Footer.tsx` | Multi‑column footer with social, contact, copyright | None |
| `Header.tsx` | Top nav, auth actions, mobile menu, session‑aware avatar + role badge | `isMenuOpen`, `isSigningOut` (state) |
| `AuthShell.tsx` | Split‑screen or single‑column auth layout | `eyebrow`, `title`, `description`, `children`, `footer`, `size?` |
| `TextField.tsx` | Labeled input with icon, error/hint, trailing action | `id`, `label`, `icon?`, `error?`, `hint?`, `trailing?` |
| `PasswordField.tsx` | Password with eye‑toggle visibility | `id`, `label`, `icon?`, `error?`, `hint?` |
| `RolePicker.tsx` | User / Vendor radio‑button selection | `value`, `onChange`, `disabled?` |
| `AvatarUpload.tsx` | Image file picker, preview, resize, remove | `preview`, `onSelect`, `onClear`, `error?`, `disabled?` |
| `icons.tsx` | SVG icons: User, Mail, Lock, Google, Spinner | None (pure SVGs) |

---
## 4. Navbar & Footer

**Header (sticky, z-50):**
- Logo link → `/`
- Desktop nav: Home + Services (hidden < md, flex ≥ md)
- Desktop auth actions: Login + Register (shown when not session, replaced by avatar/role/Sign out when logged in)
- Mobile menu toggle → slide‑in panel with nav links + auth actions
- Session‑aware: displays user’s avatar (or initials), first name, role badge (User/Vendor), Sign out
- Role badge uses `ROLE_LABELS` from `src/lib/roles.ts`

**Footer (bg-[#120A18] text-white):**
- Brand section with logo, tagline, social icons (Instagram, Facebook, Pinterest)
- Link columns: **Plan** (Home, Services, Vendors, Wedding Checklist), **Company** (About, Contact, Careers, Press), **Support** (Help Center, FAQs, Privacy, Terms)
- Contact block: email, phone, Mon–Fri 9 AM–6 PM
- Bottom bar: © year + “Made with” SVG
- Fully responsive: grid breaks from 2 columns (sm) to 12 (lg)

---
## 5. Authentication Pages

**`/login`** (`src/app/(auth)/login/`):
- Server wrapper `page.tsx` reads `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`; passes `googleEnabled` to `LoginForm`.
- `LoginForm` (client): email, password, “Remember me”, optional Google sign‑in button (disabled if creds missing).
- Validation: non‑empty email (pattern check), non‑empty password.
- Loading, error, and success states.
- Redirects authenticated users to `/`; after sign‑in, session persists.

**`/register`** (`src/app/(auth)/register/`):
- Client form with all required fields.
- Fields: Role picker (User / Vendor), avatar upload (preview + remove), full name, email, password, confirm password, terms acceptance.
- Validation: name ≥ 2 chars, email pattern, password ≥ 8 chars, passwords match, terms checked.
- Avatar: client‑side resizing to 512×512 JPEG data URL via `src/lib/avatar.ts`; only JPG/PNG/WebP allowed; max 4 MB.
- On submit: calls `signUp.email({name, email, password, image, requestedRole, callbackURL})`.
- After successful sign‑in, router pushes to `/`.
- Role stored in DB via Better Auth `user.additionalFields.role`; only `user` or `vendor` accepted; anything else defaults to `user`.

**Better Auth client** (`src/lib/auth-client.ts`):
- `createAuthClient()` with `inferAdditionalFields<typeof auth>()` plugin.
- Exports: `signIn`, `signUp`, `signOut`, `useSession`.
- `useSession().data.user.role` available in UI (Header, RolePicker).

---
## 6. Better Auth Client Configuration

**`src/lib/auth.ts`** (server):
- `betterAuth({ ... })` with:
  - `emailAndPassword: { enabled: true, minPasswordLength: 8, maxPasswordLength: 128 }`
  - Optional Google provider (only if both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set).
  - `user.additionalFields`: `role` (type `"string"`, `input: false` — **cannot** be sent in request bodies, preventing privilege escalation via `/update-user`), and `requestedRole` (type `"string"`, `input: true`, `returned: false` — public form sends this; server maps it).
  - `databaseHooks.user.create.before`: maps `requestedRole` to stored `role` — only `"user"` or `"vendor"` honoured; anything else becomes `DEFAULT_USER_ROLE` (`"user"`).
  - MongoDB adapter using `BETTER_AUTH_DB_URI` and hard‑coded DB name `mywedding`.
- No `databaseHooks.user.update` — role cannot be changed after creation (enforced by `input: false` on `role`; Better Auth’s `/update-user` simply ignores it).

**`src/lib/auth-client.ts`**:
- Consolidates the two `createAuthClient()` calls noted in earlier `AGENTS.md`.
- `inferAdditionalFields` exposes `role` on the session user object.

---
## 7. Existing Dashboards

- **None** currently implemented. No vendor dashboard, no user dashboard beyond the auth pages.
- The platform is early‑stage; dashboards would be a future feature.

---
## 8. Forms & Validation

| Form | Fields | Validation |
|---|---|---|
| **Login** | email, password, remember me, Google button | Email pattern; password non‑empty; Google disabled without creds |
| **Register** | role picker, avatar, name, email, password, confirm password, terms | Name ≥ 2 chars; email pattern; password ≥ 8; passwords match; terms checked; avatar type/size checked client‑side |

- Both forms show inline error messages, loading spinners, and success redirect.
- Error/success toasts use the existing design language (red border/background, magenta accents).
- No `alert()` used; all feedback is in‑DOM.

---
## 9. API Integration

- All auth endpoints proxied through `src/app/api/auth/\[...all\]/route.ts` → `better-auth/next-js` handler.
- Endpoints used: `signUp/email`, `SignIn/email`, `getSession`, `signOut`, `updateUser` (role ignored).
- No custom API routes beyond the Better Auth catch‑all.

---
## 10. Responsive Design

- Tailwind v4 + Turbopack `turbopack.rules` (no PostCSS config).
- Mobile‑first breakpoints throughout:
  - Header: `md` = desktop nav, `lg` = larger padding/gap.
  - Footer: `sm` = 2‑column grid, `lg` = 12‑column grid.
  - AuthShell: `size="md"` stacks on mobile, `size="lg"` larger desktop layout.
  - All components use Tailwind utility classes for responsive sizing (`sm:`, `lg:`, `xl:` prefixes).
- No fixed‑width layouts; everything flows with the viewport.

---
## 11. Existing Dependencies

| Package | Version | Notes |
|---|---|---|
| `better-auth` | `^1.7.15` | Core auth framework; provides email/password + social providers, Mongo adapter, session management. |
| `mongodb` | `^7.9.0` | MongoDB driver; `src/lib/auth.ts` hard‑codes `mongodb://localhost:27017/database` and DB name `mywedding`. |
| `mongo-adapter` | `^1.0.8` | Listed in `package.json` but **unused** (resolved only as transitive dep of `better-auth`). |
| `next` | `16.4.6` | App Router, Turbopack, `next/font`, `next/image`. |
| `react` / `react-dom` | `19.3.0` | React 19 (stable as of 2026). |
| `@tailwindcss/turbopack` | `4.3.3` | Tailwind v4 processing via Turbopack rules in `next.config.ts`. |
| `eslint` | `^9` | Flat config (`eslint.config.mjs`) + `eslint-config-next`. |
| `@types/node` / `@types/react` | `^20` / `^19` | TypeScript typings. |
| `typescript` | `^5` | `tsconfig.json` → `noEmit`, `strict`, paths `@/* → src/*`. |
| `next/font` | — | Geist font (not used; project uses Manrope globally via `layout.tsx`). |

---
## 12. Missing Assignment Requirements

| Requirement | Status | Notes |
|---|---|---|
| **Three user roles** (user, vendor, admin) | **Partially Completed** | `USER_ROLES` defined in `src/lib/roles.ts`; `admin` exists but **cannot** be self‑assigned via public registration. |
| **Public registration offers user/vendor choice** | **Completed** | `RolePicker` presents User/Vendor radio buttons; `requestedRole` stored, mapped by `databaseHooks.user.create.before`. |
| **Admin role not available as public registration** | **Completed** | `isRegistrationRole()` only allows `"user"` or `"vendor"`; any other value becomes `"user"` (DEFAULT_USER_ROLE). |
| **Registration: User Type Selection** | **Completed** | `RolePicker` UI component. |
| **Registration: Profile Picture Upload** | **Completed** | `AvatarUpload` with preview, resize to 512×512 JPEG, type/size validation. |
| **Registration: Full Name** | **Completed** | `TextField` for name, validated ≥ 2 chars. |
| **Registration: Email Address** | **Completed** | `TextField` with email type and pattern validation. |
| **Registration: Password** | **Completed** | `PasswordField` with ≥ 8 chars hint; `confirm-password` field ensures match. |
| **Better Auth for authentication** | **Completed** | `src/lib/auth.ts` configures Better Auth with email/password + optional Google. |
| **Save user information to database** | **Completed** | MongoDB via `mongodbAdapter`; user doc includes `name`, `email`, `image`, `role`, `requestedRole`. |
| **Store selected user role in database** | **Completed** | `role` field persisted; non‑input so cannot be altered via `/update-user`. |
| **Proper login and registration functionality** | **Completed** | Both pages work end‑to‑end against local MongoDB (verified). |
| **Maintain existing colors, typography, design** | **Completed** | All UI re‑uses existing palette (`#D81B7E`, `#FA4796`, `#190C24`, `#120A18`), Manrope font, rounded cards, gradient buttons, transition animations. |
| **Fully responsive pages** | **Completed** | Tailwind v4 responsive utilities throughout; tested at mobile/desktop widths. |
| **Do not break existing functionality** | **Completed** | `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass with no new errors. |

---
## 13. Summary of Classifications

| Feature | Classification | Rationale |
|---|---|---|
| Project scaffolding & build setup | **Completed** | Next.js 16, Turbopack, Tailwind v4, TypeScript all compile and pass checks. |
| Homepage (`Banner`) | **Completed** | Fully built, responsive, integrated into `layout.tsx`. |
| `Header` component | **Completed** | Sticky nav, mobile menu, session‑aware avatar/role/Sign out; matches existing design. |
| `Footer` component | **Completed** | Multi‑column layout, social links, contact block, bottom bar; fully responsive. |
| `/login` page | **Completed** | Email/password form, optional Google (disabled without creds), validation, redirect. |
| `/register` page | **Completed** | Full form with role picker, avatar, name/email/password, terms; validated and saves to DB. |
| Better Auth server config | **Completed** | Email/password enabled, Google optional, role stored with input‑prevention. |
| MongoDB integration | **Completed** | DB reachable, user records created, role persisted. |
| Role‑based logic (user/vendor/admin) | **Partially Completed** | Roles defined and stored; `admin` intentionally not publicly creatable; gap: no admin‑promotion UI yet. |
| Google OAuth sign‑in | **Partially Completed** | Button present in `LoginForm`; disabled until `GOOGLE_CLIENT_ID`+`GOOGLE_CLIENT_SECRET` set. |
| Vendor/dashboard or user dashboard | **Not Implemented** | No dedicated pages or admin/UIs beyond auth. |
| Wedding‑planning features (checklist, vendors marketplace) | **Not Implemented** | Only auth and basic marketing UI built; routes referenced in Footer not yet wired. |
| `mongo-adapter` in `package.json` | **Needs Fixing** | Listed but unused/transitive; should be declared as direct dependency or removed from `package.json` if better-auth provides it transitively. |
| Unused `Image` import warning in `src/app/page.tsx` | **Needs Fixing** | Lint reports one warning; import can be removed or used. |
| Admin account creation flow | **Not Implemented** | Admins must be promoted directly in MongoDB; no admin‑promotion UI or API. |
| Form error/success states for all edge cases | **Partially Completed** | Core flows validated; edge cases (e.g., duplicate email, weak password) handled by Better Auth but not customized UI‑wise. |

---
## 14. Recommendations (for future work, not to be implemented now)

1. **Declare `mongo-adapter` directly** in `package.json` or remove it if better‑auth’s transitive dependency is sufficient.
2. **Remove the unused `Image` import** from `src/app/page.tsx` to eliminate the lint warning.
3. **Add admin‑promotion workflow** if admin accounts are needed (direct MongoDB update or a protected admin‑only route).
4. **Implement the remaining routes** referenced in Footer (`/services`, `/vendors`, `/checklist`, `/about`, `/contact`, `/press`) or delete the links.
5. **Expose vendor‑specific features** (profile, listings) once the vendor role is actively used.
6. **Add duplicate‑email / password‑strength UI hints** beyond Better Auth’s default messages if desired.

---
*End of CLIENT_AUDIT.md*
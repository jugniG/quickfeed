# QuickFeed — Dev Guide

## Stack

- **Framework**: TanStack Start (SSR, file-based routing)
- **Router**: `@tanstack/react-router`
- **State**: `@tanstack/react-query`
- **API**: oRPC (`src/orpc/`)
- **UI**: HeroUI + TailwindCSS 4
- **Auth**: Better Auth (`src/lib/auth-client.ts`)
- **DB**: Drizzle ORM + PostgreSQL
- **Storage**: Cloudflare R2
- **Runtime**: Bun, React 19, TypeScript

## Route Structure

```
src/routes/
├── index.tsx                       → / (landing)
├── login.tsx                       → /login
├── pricing.tsx                     → /pricing
├── _protected/                     → Auth-gated layout (has DashboardTopbar + bg)
│   ├── route.tsx                   → ProtectedLayout — renders <DashboardTopbar /> + <Outlet />
│   ├── billing.tsx                 → /billing
│   └── dashboard/
│       ├── index.tsx               → /dashboard
│       └── $websiteId/
│           ├── index.tsx           → /dashboard/:websiteId
│           └── settings/
│               └── index.tsx      → /dashboard/:websiteId/settings
└── api/
    ├── feedback/index.ts           → POST /api/feedback (public widget endpoint)
    ├── upload/index.ts             → POST /api/upload (R2 upload)
    └── rpc.$.ts                    → oRPC handler
```

## Layout Rules — CRITICAL

**`_protected/route.tsx` is the shared layout for all auth-gated pages.**

- It renders `<DashboardTopbar />` and `<Outlet />` — once, in one place.
- **NEVER import or render `DashboardTopbar` in individual page components.**
- Page components return only their own content (fragments or `<main>`).
- `min-h-screen bg-[#FAFAFA]` lives in `ProtectedLayout`, not per-page.

```tsx
// ✅ Correct — page just returns its content
function Dashboard() {
  return (
    <>
      <main className="max-w-[1100px] mx-auto px-6 py-10">
        ...
      </main>
    </>
  )
}

// ❌ Wrong — never do this
function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardTopbar user={user} />
      <main>...</main>
    </div>
  )
}
```

## Width Conventions

| Page | Max-width |
|------|-----------|
| `/dashboard` | `max-w-[1100px]` |
| `/dashboard/:websiteId` | `max-w-[820px]` |
| `/dashboard/:websiteId/settings` | `max-w-[900px]` |
| Topbar inner wrapper | `max-w-[1100px]` |

## Navigation

- Use `<Link>` for all navigation (not `useNavigate` unless after async ops)
- Website IDs are UUIDs (strings) — never `Number(websiteId)`

## API

- Use oRPC for all internal APIs (`src/orpc/router/`)
- REST routes only for: widget endpoint, auth callbacks, webhooks, file uploads
- Feedback widget API: domain verified via `Origin`/`Referer` vs registered domain; localhost always allowed

## Storage (R2)

- Images: `feedback/{websiteId}/{uuid}.ext`
- Public URL: `CF_R2_PUBLIC_URL` env var
- Env vars: `CF_R2_ACCOUNT_ID`, `CF_R2_ACCESS_KEY_ID`, `CF_R2_SECRET_ACCESS_KEY`, `CF_R2_BUCKET_NAME`

## Widget

- No visible trigger — opened via `Ctrl+Shift+F`
- Closed via `Esc` or backdrop click
- Global API: `window.QuickFeed.open()` / `.close()`

## Dev Commands

```bash
bun run dev                         # Start dev server (port 3000)
bun run tsc --noEmit                # Type check (ignore orpc/middleware errors)
git add -A && git commit && git push origin main
```

## Known Pre-existing TS Errors (ignore)

- `src/orpc/middleware/auth.ts`
- `src/orpc/middleware/error-logger.ts`

# Setup Guide

Detailed setup instructions for the Rhyan Vargas Portfolio Website.

## Prerequisites

- Node.js `^22.23.5` (see `package.json` `engines`)
- pnpm (recommended)
- Git

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/rhyanvargas/rhyan-portfolio-website.git
cd rhyan-portfolio-website
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup

Payload requires env vars. Copy the example and set a real secret:

```bash
cp .env.example .env
# Edit .env — set PAYLOAD_SECRET to a long random string
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `PAYLOAD_SECRET` | Yes | Signs Payload auth/sessions; app fails fast if missing |
| `DATABASE_URL` | Local default | SQLite file URL, e.g. `file:./payload.db` |
| `POSTGRES_URL` | Preview/Production | Neon connection string (Vercel Marketplace injects this) |
| `PAYLOAD_JOBS_AUTORUN` | Vercel | Set `false` so jobs run via cron (`/api/payload-jobs/run`), not on every request |
| `NEXT_PUBLIC_SERVER_URL` | Recommended on Vercel | Public origin for Payload live preview links |
| `PREVIEW_SECRET` | Preview/draft Mode | Shared secret for `/next/preview` |
| `CRON_SECRET` | Vercel Cron | Bearer token for `/api/payload-jobs/run` |

Local SQLite creates `payload.db` in the repo root (gitignored).

### Neon (Vercel Marketplace) — Preview / Production

1. Vercel project → **Integrations** / **Marketplace** → install **Neon** (Free plan).
2. Connect it to **v0-rhyan-s-portfolio-website** for **Preview** + **Production** (+ Development if you pull env locally).
3. Leave **Create database branch for deployment** unchecked (solo workflow: Preview and Production share Neon `main` so seeded content is visible on both).
4. Confirm env vars appear under **Settings → Environment Variables** (`POSTGRES_URL`, often `DATABASE_URL` / `DATABASE_URL_UNPOOLED`, plus `PAYLOAD_JOBS_AUTORUN=false`).
5. Keep local `.env` on `DATABASE_URL=file:./payload.db` (no `POSTGRES_URL` locally unless you want to hit Neon from your laptop).
6. Redeploy after the integration is linked so Preview picks up the shared connection string.
7. In Vercel → **Settings → General → Build & Development Settings**, set **Build Command** to:
   ```bash
   pnpm build:vercel
   ```
   (`payload migrate && next build` — applies Postgres schema on deploy when `POSTGRES_URL` is present.)

Payload selects adapters in `payload.config.ts`: **Postgres** when `POSTGRES_URL` or a `postgres://` `DATABASE_URL` is set; otherwise **SQLite**. Postgres uses `push: false` so schema changes only land via `payload migrate` (never via local `pnpm dev` against Neon).

### 4. Start Development Server
```bash
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) — create the **first user immediately** on a fresh database (registration is open only while no users exist)
- Posts: [http://localhost:3000/posts](http://localhost:3000/posts)

Optional seed (Skill + Project + published Post) after env is set:

```bash
pnpm exec tsx scripts/seed-payload-now.ts
```

## Configuration

### Homepage / Work (Now)

Public homepage sections and project filters still read `config/portfolio.ts` (regression fence until the Next cutover).

### CMS content (Payload)

Posts, Projects, and Skills are edited in `/admin`. See [ADR-002](architecture/adrs/ADR-002-payload-cms.md).

### Project Filtering System

Filtering still runs against portfolio config data. See [Project Filtering System](filtering-system.md).

### Styling Customization
- Global styles: `app/(frontend)/globals.css`
- Component styles: Tailwind CSS classes
- Theme: CSS variables in globals.css

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run Vitest |
| `pnpm typecheck` | TypeScript check |
| `pnpm verify` | test + typecheck + build |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | Regenerate `payload-types.ts` |
| `pnpm generate:importmap` | Regenerate Payload admin import map |

## Troubleshooting

### Common Issues

**Missing `PAYLOAD_SECRET`:**
```text
PAYLOAD_SECRET is required. Copy .env.example to .env …
```
Create `.env` from `.env.example` and set a non-empty secret.

**Port 3000 already in use:**
```bash
lsof -ti:3000 | xargs kill -9
# Or:
pnpm dev -- -p 3001
```

**Build errors:**
```bash
rm -rf .next
pnpm build
```

**TypeScript errors:**
```bash
pnpm typecheck
pnpm lint --fix
```

### Getting Help

- Check [main README](../README.md)
- Review [architecture docs](architecture.md) and [ADR-002](architecture/adrs/ADR-002-payload-cms.md)
- Open an issue on GitHub
- Contact [hello@rhyan.dev](mailto:hello@rhyan.dev)

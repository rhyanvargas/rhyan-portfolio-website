# Payload deploy notes (foundation spike)

## Local

1. Copy `.env.example` → `.env`
2. `pnpm install && pnpm dev`
3. Open `/admin` and create the first user
4. Optional seed: `pnpm seed:projects` (imports the first featured project from `config/portfolio.ts`)
5. Public CMS routes: `/work`, `/work/[slug]`; inquiry stub: `/inquire`

SQLite is the default (`DATABASE_URL=file:./payload.db`).

## Production (Vercel + managed Postgres)

1. Provision Postgres (Neon preferred; Supabase or Vercel Postgres OK).
2. Set env vars on the host:
   - `DATABASE_URL=postgresql://…`
   - `PAYLOAD_SECRET=<long random string>`
3. `payload.config.ts` auto-selects `@payloadcms/db-postgres` when `DATABASE_URL` starts with `postgres://` or `postgresql://` (or when `PAYLOAD_DB=postgres`).
4. Deploy the Next app (admin + site share the same deploy).
5. Run migrations / first boot against Postgres; create the admin user; seed or migrate content.

## CTA

Shared label **Start a conversation** → `/inquire` (hero + pre-footer). Full questionnaire is later.

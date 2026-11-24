# ADR-003 — Neon preview branches, separate from production

**Status:** Accepted  
**Date:** 2026-11-18  
**Extends:** [ADR-002](ADR-002-payload-cms.md) (Payload + Neon). Does not change the CMS choice.

## Context

Preview and production initially shared one Neon database (`main`), including content, schema, and Payload users. That matched a solo “see live projects on preview” shortcut documented in `docs/setup.md`. It is not the practice Neon documents for Vercel: preview deploys should get an isolated database branch so schema migrations and CMS edits cannot change production.

## Decision

Enable Neon **Create database branch for deployment → Preview only**. Leave Production unchecked so `main` deploys keep the Neon production branch.

| Environment | Database |
|-------------|----------|
| Local | SQLite `payload.db` (`POSTGRES_URL` unset) |
| Vercel Preview (`feat/*`, `dev`) | Neon branch `preview/<git-branch>` (copy-on-write; reused for later deploys of that Git branch) |
| Vercel Production (`main`) | Neon production branch |

`pnpm build:vercel` stays `payload migrate && next build`. The migration runs against the connection string injected for **that** deployment. Payload still selects Postgres from `POSTGRES_URL` in [payload.config.ts](../../../payload.config.ts); no adapter change.

A new preview branch starts as a copy of production at creation time (rows and users included). Later preview writes and new users stay on the branch. Production changes only via production `/admin` or a `main` deploy.

## Consequences

- Preview `/admin` experiments do not edit production. They also do not publish content to rhyan.dev.
- The first preview after enabling branching copies current production users; those copies then diverge.
- Laptop `POSTGRES_URL` remains forbidden: a pulled production URL still writes to production.
- Optional follow-up: distinct `PAYLOAD_SECRET` / `PREVIEW_SECRET` / `CRON_SECRET` per Vercel environment. Cookies are already host-scoped.
- A long-lived staging environment (fixed non-prod Neon branch) is out of scope.

## References

- [Neon — Vercel-Managed integration](https://neon.com/docs/guides/vercel-managed-integration) (Preview branching; production stays on the production branch)
- [Neon — Neon-Managed integration](https://neon.com/docs/guides/neon-managed-vercel-integration)
- [Neon — preview branch cleanup](https://neon.com/docs/guides/vercel-branch-cleanup)
- [Payload — Migrations](https://payloadcms.com/docs/database/migrations) (migrate in CI/build against the target database)
- Runbook: [docs/developer-runbook.md](../../developer-runbook.md)

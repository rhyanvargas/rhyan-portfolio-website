# ADR-002 — Payload CMS for portfolio content

**Status:** Accepted  
**Date:** 2026-11-14  
**Supersedes:** Keystatic exploration (parked on `archive/keystatic-spike`)

## Context

Portfolio content lived only in `config/portfolio.ts`. We evaluated Keystatic, then Payload. Keystatic remains archived; this ADR records Payload as the content platform and the Now / Next / Later roadmap.

## Decision

Use **Payload 3.94.1** inside the Next App Router (`16.4.6`, Node `^22.23.5`) with:

| Horizon | Outcome |
|---------|---------|
| **Now** | Posts, Projects, Skills collections + `/admin` CRUD; public `/posts`; homepage still reads `portfolioConfig` |
| **Next** | Live preview; scheduled publish on Posts (versions already enabled); cut Work/filters over to Projects + Skills |
| **Later — composition** | Theme global, widget catalog (blocks), section reorder — one epic |
| **Later — audience** | Inquiry inbox (form → notify → list → reply). Not newsletter or calendar booking. |
| **Won’t (this roadmap)** | LinkedIn API integration; newsletter product; calendar booking |

Local DB: SQLite (`@payloadcms/db-sqlite`, `DATABASE_URL=file:./payload.db`).  
Preview/Production: **Neon Free via Vercel Marketplace** with `@payloadcms/db-vercel-postgres` when `POSTGRES_URL` (or `postgres://` `DATABASE_URL`) is set. Database isolation (preview branch vs production branch) is [ADR-003](ADR-003-neon-preview-branching.md). Turso/libsql remains an optional SQLite-remote path.

React was bumped to **19.x** because `@payloadcms/ui@3.93.0` and `@payloadcms/richtext-lexical@3.93.0` require it (escape hatch exercised).

## Consequences

- Author edits content in `/admin` without changing code for Posts / Projects / Skills.
- Public Work filters stay on `portfolioConfig` until the Next cutover (REQ-005 fence).
- Posts ship with `versions.drafts` so scheduling does not require a schema rewrite.
- Secrets: `PAYLOAD_SECRET` + `DATABASE_URL` in `.env.example`; SQLite file gitignored. Config fails fast if `PAYLOAD_SECRET` is missing.
- Keystatic packages must not return on this branch.
- **Next cutover mapping:** portfolio `isFeatured` → Payload `featured`; `skillCategories` → Skills relationship; portfolio `tech[]` is not yet a Payload field — add or map explicitly when Work moves off `portfolioConfig`.
- **Deploy:** create the first `/admin` user immediately after a fresh deploy (open registration only while `users` is empty).

## References

- Living spec: `.cursor/docs/specs/payload-cms.md`
- Plan: `.cursor/plans/payload-cms.plan.md`
- Install: https://payloadcms.com/docs/getting-started/installation

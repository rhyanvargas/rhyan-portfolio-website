---
name: Payload CMS foundation
overview: "Now: Payload 3.93.0 + Next 15.4.11 with the critical content model (Posts, Projects, Skills) and public posts. Next: live preview, scheduling, homepage cutover. Later: composition and inquiry inbox as separate epics."
todos:
  - id: T1
    content: REQ-001 — Pin next@15.4.11, Node ^22.23.5; verify typecheck/build
    status: completed
  - id: T2
    content: REQ-002 — Install payload@3.93.0 stack + sqlite; withPayload; (payload)/(frontend) routes
    status: completed
  - id: T3
    content: REQ-003/REQ-009/REQ-006 — Users + Posts + Projects + Skills schema; versions on Posts; env; /admin CRUD
    status: completed
  - id: T4
    content: REQ-004 — Local API + public /posts list and /posts/[slug]
    status: completed
  - id: T5
    content: REQ-005 — Homepage and filters still read portfolioConfig; tests green; no Keystatic
    status: completed
  - id: T6
    content: REQ-007 — ADR-002 with Now/Next/Later roadmap
    status: completed
  - id: T7
    content: VERIFY Now slice — pnpm verify + admin CRUD for three collections + public post
    status: completed
  - id: T8
    content: Next (queued) — live preview, scheduled publish, cut Work/filters over to Projects+Skills
    status: pending
  - id: T9
    content: Later composition (queued) — theme, widget catalog, section reorder as one epic
    status: pending
  - id: T10
    content: Later audience (queued, separate spec) — inquiry inbox; not newsletter or calendar
    status: pending
isProject: false
---

# Payload CMS — Implementation Plan

**Goal:** Put the portfolio content model in Payload: Posts, Projects, and Skills editable in `/admin`, with public posts, without changing how the homepage is rendered yet.

**Architecture:** Payload inside the Next App Router. Public UI stays in `(frontend)` and keeps reading `config/portfolio.ts` until a later cutover. Content reads use the Local API. SQLite locally; Postgres or Turso documented for Vercel.

**Tech Stack:** Next `15.4.11`, Payload `3.93.0`, `@payloadcms/db-sqlite`, Lexical, pnpm, Vitest.

**Spec:** [`.cursor/docs/specs/payload-cms.md`](../docs/specs/payload-cms.md)

## Why this order

The critical slice is the schema. Theme, widgets, layout, previews, and scheduling all attach to documents that do not exist yet. Previews and scheduling are Payload-native once Posts have versions, so they are **Next**, not a second content model. Theme + widgets + reorder are one composition epic. Forms, notifications, and replies are an inbox product, not a collection on this plan.

| Ask | Decision | Why |
|-----|----------|-----|
| Posts, Projects, Skills | **Now** | This is the site. Skills are a collection Projects relate to, categories locked to `SKILL_CATEGORIES`. |
| Live preview | **Next** | High author value, low new surface once a collection exists. |
| Content scheduling | **Next** | Turn on Payload scheduled publish. Enable `versions` on Posts in Now so this is not a migration. |
| Theme / widgets / layout reorder | **Later, one epic** | Widgets are code + blocks. Reorder needs those blocks. Theme is a global the blocks read. Building them before content is in Payload optimizes the wrong layer. |
| LinkedIn integration | **Won’t on this roadmap** | Social URLs already live on the site. An API integration does not improve the content model. |
| Email subscriptions | **Won’t inside CMS** | Newsletter is consent + a mailer. Separate product. |
| Form → notify → list → reply | **Later, own spec** | Real, but it is an inbox (storage, email provider, reply), not Posts/Projects/Skills. “Book a time” starts as fields on that form. |
| Calendar booking | **Won’t until inbox is used** | Availability and reminders are a third product. |

## Global Constraints

- All `@payloadcms/*` and `payload` at **3.93.0**
- Next **15.4.11** only
- Node **^22.23.5**
- Follow [Payload installation](https://payloadcms.com/docs/getting-started/installation)
- Reuse patterns from `origin/cursor/payload-foundation-spike-e0fb`; implement on current `dev`
- Keystatic stays on `archive/keystatic-spike`
- Prefer React 18 unless forced to 19
- Now does not switch the homepage off `portfolioConfig`

## Review Focus

1. Project/Skill fields drifting from `enhancedProjectSchema` and `SKILL_CATEGORIES` (filter cutover will break)
2. Version peer mismatches
3. Route-group move breaking layout
4. Secrets in git
5. Local API imported into client components

## Tracer gate

T1 → T2 → T3 → T4: create a Skill, a Project related to it, and a Post in `/admin`; the Post is visible at `/posts/[slug]`; the homepage still uses `portfolioConfig`. Stop before T8.

## Requirements → tasks

| Requirement | Tasks |
|-------------|-------|
| REQ-001 | T1 |
| REQ-002 | T2 |
| REQ-003, REQ-006, REQ-009 | T3 |
| REQ-004 | T4 |
| REQ-005 | T5 |
| REQ-007 | T6 |
| REQ-008 | T3 (versions on Posts only) |
| Verify | T7 |
| Next / Later | T8, T9, T10 — do not start |

## File map (Now)

| Path | Responsibility |
|------|----------------|
| `collections/Posts.ts` | Post + versions drafts |
| `collections/Projects.ts` | Project fields + relationship to skills |
| `collections/Skills.ts` | name, slug, category select |
| `collections/Users.ts` | Auth |
| `payload.config.ts` | Register the four collections, sqlite, lexical, secret |
| `lib/payload.ts` | Server-only `getPayload` |
| `app/(frontend)/posts/**` | Public list and detail |
| `app/(payload)/**` | Admin and API from the install guide |
| `app/(frontend)/page.tsx` | Unchanged data source: `portfolioConfig` |

## Tasks

### T1 — REQ-001 Version pin

- [x] Node `>=22.23.5`
- [x] `next@15.4.11`
- [x] `pnpm install` && `pnpm typecheck` && `pnpm build`
- [ ] Commit: `chore: pin Next 15.4.11 for Payload compatibility`

### T2 — REQ-002 Install wiring

- [x] `pnpm add payload@3.93.0 @payloadcms/next@3.93.0 @payloadcms/db-sqlite@3.93.0 @payloadcms/richtext-lexical@3.93.0 sharp graphql`
- [x] `(payload)` routes from the Blank Template; move current UI into `app/(frontend)/`
- [x] `withPayload` in `next.config.mjs`
- [x] `payload.config.ts` + `@payload-config` path
- [x] Dev server boots

### T3 — REQ-003 / REQ-009 / REQ-006 Schema

- [x] `Skills`: name, slug, category (`SKILL_CATEGORIES`)
- [x] `Projects`: slug, title, summary, highlights, roles, domains, links, thumbnail, featured, relationship `skills` hasMany
- [x] `Posts`: title, slug, lexical content, `versions: { drafts: true }`
- [x] `Users` auth collection
- [x] `DATABASE_URL=file:./payload.db`, gitignore db, `.env.example` with `PAYLOAD_SECRET`
- [x] In `/admin`, create one Skill, one Project pointing at it, one Post
- [ ] Commit: `feat: add Payload Posts, Projects, and Skills collections`

### T4 — REQ-004 Public posts

- [x] `lib/payload.ts` server-only helper
- [x] `/posts` list and `/posts/[slug]` detail via Local API
- [ ] Commit: `feat: render posts from Payload Local API`

### T5 — REQ-005 Regression fence

- [x] `pnpm test` green
- [x] Homepage sections and `#work` filters still come from `portfolioConfig`
- [x] No `@keystatic` on the branch

### T6 — REQ-007 ADR

- [x] `docs/architecture/adrs/ADR-002-payload-cms.md` with the roadmap table above
- [ ] Commit: `docs: ADR-002 Payload content model and roadmap`

### T7 — VERIFY Now

- [x] `pnpm test && pnpm typecheck && pnpm build`
- [x] Checklist: admin CRUD on Skills, Projects, Posts; public post URL; homepage unchanged

### T8 — Next (queued)

- [ ] Live preview for Posts, then Projects
- [ ] Scheduled publish on Posts
- [ ] Point Work/filters at Projects + Skills; retire duplicate project copy in `portfolioConfig`

### T9 — Later composition (queued, one epic)

- [ ] Theme global applied through CSS variables / `next-themes`
- [ ] Widget catalog as Payload blocks (hero, about, work, contact) — new widget means new code
- [ ] Homepage section order stored as an ordered blocks field

### T10 — Later audience (queued, new spec before any build)

- [ ] Inquiry collection + public form
- [ ] Email notification on create
- [ ] Admin list and reply
- [ ] Optional requested date/time fields
- [ ] Do not add newsletter lists or calendar sync in that spec

## Handoff / Progress

- **Updated:** 2026-11-14
- **Done:** T1–T7 (Now slice) + review fixes: fail-fast `PAYLOAD_SECRET`; explicit collection write access; Users first-user create gate; README/`docs/setup` sync; ADR cutover/deploy notes; living-spec React 19 pin.
- **Files:** (prior Now slice) + `lib/payload-access.ts`, `collections/*` access, `payload.config.ts`, `README.md`, `docs/setup.md`, ADR-002, `.env.example`, living spec
- **Now:** Commit when asked; then T8 only after explicit go. Residual: Medium #5 `tech` field still deferred to Next cutover (documented).
- **Watchouts:** Create first admin user immediately on fresh deploy; keep `payload.db` / `.env` untracked.
- **Git:** committed on `dev` (4 commits ahead of origin; not pushed)

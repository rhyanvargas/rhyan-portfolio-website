# Payload CMS — Living Spec

**Status:** Now slice implemented; review fixes applied  
**Size:** Medium (brownfield + architecture integration)  
**Mode:** Design-First (CMS/platform chosen) → testable REQs  
**Branch context:** `dev` cleaned; Keystatic parked on `archive/keystatic-spike`  
**Reference spike:** `origin/cursor/payload-foundation-spike-e0fb` (reuse structure; retarget versions)

## Outcome

For visitors and the solo author, the site’s content model lives in Payload: **posts, projects, and skills** are created in `/admin` and readable by the app. Presentation controls, publishing workflow, and an audience inbox are later roadmap tracks, not part of the critical slice.

## Product framing

**Job of the critical slice:** stop editing portfolio content only in `config/portfolio.ts`. The author manages the three collections the site is actually about.

**Framework:** Now / Next / Later + value vs effort (solo product, no usage metrics — RICE would invent numbers).

| Horizon | Outcome | Items |
|---------|---------|--------|
| **Now** | Content model you can edit in admin without breaking the live portfolio | Posts, Projects, Skills collections + admin CRUD; public Posts; homepage still reads `portfolioConfig` |
| **Next** | Authoring quality on that model, then swap the homepage onto it | Live preview; drafts + scheduled publish; cut public Work/filters over to Projects+Skills |
| **Later — composition** | Change how the page looks without a redeploy of copy | Theme switcher; widget catalog; section reorder (one epic — they depend on each other) |
| **Later — audience** | Hear from people and reply | Inquiry inbox (form → notify → list → reply). Not a CMS collection. |
| **Won’t (this roadmap)** | | LinkedIn auto-publish; newsletter product; calendar booking — separate bets, not bundled into inbox |

**Split the “email” ask.** Three different jobs were bundled:

1. **Inquiry inbox** — someone submits a form (contact or appointment request); you get notified, see the list, and reply from admin. This is the one worth a later epic.
2. **Newsletter subscriptions** — consent, double opt-in, broadcast. Different compliance and a mailer. Do not build inside the CMS spike.
3. **Appointment booking** — availability, calendar, reminders. A scheduling product. Capture “request a time” as a form field on the inquiry inbox first; do not integrate a calendar until that inbox is used.

**LinkedIn.** Profile links already exist on the site. An integration (OAuth, auto-post, embed feed) does not make the content model better. Park until there is a repeated publishing job it removes.

## Assumptions

1. Solo author; no multi-tenant roles beyond Payload default Users.
2. Prefer **Payload 3 stable** over Payload 4 canary.
3. Prefer staying on **Next 15** (supported band) over jumping to Next 16 for this cut.
4. Local spike uses **SQLite file**; production on Vercel uses **Postgres or Turso** (documented, not blocking Phase 1 local verify).
5. During **Now**, public homepage and project filters still read `config/portfolio.ts`. Payload owns the schema; cutover of public Work is **Next**.
6. React stays **18.x** unless install proves Payload admin requires 19. **Resolved:** `@payloadcms/ui@3.93.0` / richtext-lexical require React 19 — bumped.
7. Skills are a collection (name, slug, category), not free-text tags. Projects relate to Skills. Categories stay aligned with `SKILL_CATEGORIES` in `lib/constants.ts` so filters can move later without a second taxonomy.
8. Posts enable drafts/versions in the schema now so scheduling does not require a migration. Scheduling UI is **Next**, not Now.

→ Correct these if wrong before `/implement-spec`.

## Version pins (most stable compatible set — verified 2026-11-14)

| Package | Pin | Why |
|---------|-----|-----|
| `payload` + all `@payloadcms/*` | **3.93.0** | Latest stable Payload 3.x; align all Payload packages |
| `next` | **15.4.11** | Latest in `@payloadcms/next@3.93.0` peer band `>=15.4.11 <15.5.0` |
| `react` / `react-dom` | **^19.1.2** | Required by `@payloadcms/ui` / richtext-lexical 3.93.0 |
| Node | **^22.23.5** | Payload engines / install docs |
| DB local | `@payloadcms/db-sqlite@3.93.0` | Spike simplicity |
| DB prod (doc) | `@payloadcms/db-postgres@3.93.0` or Turso via sqlite remote | Vercel persistence |
| Editor | `@payloadcms/richtext-lexical@3.93.0` | Official rich text |
| Avoid | Payload 4 canary; Next 15.5.x; Next 16 for Phase 1 | Unsupported or larger blast radius |

Source: [Payload installation](https://payloadcms.com/docs/getting-started/installation); `npm view @payloadcms/next@3.93.0 peerDependencies`.

## Scope

### In scope — Now (critical slice)

- Pin Next/Node to supported versions
- Install Payload per official existing-app guide
- `(payload)` + `(frontend)` route groups
- Collections: **Users, Posts, Projects, Skills** (Media only if an upload field needs it)
- Skills: `name`, `slug`, `category` (select = `SKILL_CATEGORIES`)
- Projects: fields aligned with `enhancedProjectSchema` (title, slug, summary, highlights, roles, domains, links, thumbnail, featured) plus relationship → Skills
- Posts: title, slug, rich text, draft/publish versions enabled
- Public `/posts` and `/posts/[slug]` via Local API
- Admin CRUD for all three content collections
- ADR-002; `.env.example`
- Homepage + filters still served from `portfolioConfig` (regression fence)

### In scope — Next (after Now verifies)

- Payload live preview on Posts (then Projects)
- Scheduled publish using the versions already on Posts
- Public Work section + filters read Projects/Skills instead of `portfolioConfig`

### In scope — Later (not this implementation plan)

- Composition epic: theme global, developer-defined widget blocks, homepage section reorder
- Audience epic: inquiry form → email notification → admin list → reply. Appointment = requested time on the form, not a calendar.

### Out of scope

- Newsletter / email broadcast product
- Calendar booking integration
- LinkedIn (or other social) API integration
- Payload 4
- Keeping Keystatic alongside Payload

## Requirements

### REQ-001 — Runtime compatibility
Must run on Node `^22.23.5` and Next `15.4.11` with Payload `3.93.0`. `pnpm typecheck` and `pnpm build` succeed after pin.

### REQ-002 — Official install shape
Must follow [Payload existing-app install](https://payloadcms.com/docs/getting-started/installation): packages, `(payload)` routes, `withPayload(nextConfig)`, `payload.config.ts`, `@payload-config` tsconfig path.

### REQ-003 — Admin bootstrap
Author can open `/admin`, create the first user, and create documents in **Posts, Projects, and Skills**.

### REQ-004 — Posts public surface
Unauthenticated visitors can list posts at `/posts` and read a post at `/posts/[slug]` rendered from the Payload Local API.

### REQ-009 — Critical content model
- A Skill has name, slug, and one category from `SKILL_CATEGORIES`.
- A Project stores the portfolio project fields needed by today’s filters (roles, domains, summary, links, featured) and a many-relationship to Skills.
- A Post has title, slug, rich text, and draft/publish versions enabled.
- Creating these documents does not require a code change.

### REQ-005 — Portfolio regression fence
Homepage and project filtering stay driven by `config/portfolio.ts` until the Next cutover. Existing filter tests stay green. No Keystatic imports.

### REQ-006 — Secrets and DB env
Repo documents `PAYLOAD_SECRET` and `DATABASE_URL` in `.env.example`; local SQLite file is gitignored; no secrets committed.

### REQ-007 — Supersede Keystatic decision
ADR-002 records Payload choice, Keystatic archive branch, version pins, and this roadmap (Now content model / Next authoring / Later composition and inbox).

### REQ-008 — Do not block later tracks
Posts ship with versions so scheduling can be turned on without a schema rewrite. Config does not hard-code a single homepage layout inside the Posts/Projects/Skills collections. Composition and inbox are not implemented in Now.

## Analyze findings

1. **REQ-001 vs current tree** — Next is `^15.5.27` (unsupported).  
   **Fix:** Pin `next@15.4.11` before Payload install (T1).
2. **REQ-005 vs React upgrade** — Foundation spike used React 19; staying on 18 reduces risk.  
   **Fix:** Keep React 18 unless install fails (documented escape hatch).
3. **REQ-004 vs foundation branch** — Older spike seeded Projects/work routes, not Posts.  
   **Fix:** Phase 1 delivers **Posts**; reuse route-group pattern from that branch, not its content model wholesale.
4. **Prod DB** — SQLite file ephemeral on Vercel.  
   **Fix:** Phase 1 documents Postgres/Turso; local SQLite only for spike verify.
5. **Brownfield base** — Foundation spike diverged before filtering-system merge.  
   **Fix:** Implement on current clean `dev`, copy patterns—not merge that branch blindly.

## Test seams

| Seam | Proves |
|------|--------|
| `pnpm typecheck` / `pnpm build` | REQ-001 |
| Manual `/admin` create user + post | REQ-003 |
| Vitest or thin integration around `getPayload`/`find` helper | REQ-004 |
| Existing filter tests + homepage smoke | REQ-005 |
| `.env.example` + `.gitignore` review | REQ-006 |

## Open questions

1. Prod DB preference: **Vercel Postgres** vs **Turso**? (Default in plan: document both; implement Postgres adapter path first for prod notes.)
2. Public URL: keep `/posts` or later alias `/blog`? (Default: `/posts` Phase 1.)

## Success criteria (Now done)

- [x] Versions pinned as table above
- [x] `/admin` CRUD for Posts, Projects, and Skills
- [x] `/posts` + `/posts/[slug]` render from Local API
- [x] Portfolio homepage/filters still read `portfolioConfig`
- [x] ADR-002 records the roadmap split
- [x] No Keystatic dependencies on the feature branch

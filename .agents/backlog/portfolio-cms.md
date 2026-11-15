# Portfolio CMS / public IA — backlog

Captured from `/review` (2026-11-15). Living plan: `.cursor/plans/payload-cms.plan.md`. Living spec: `.cursor/docs/specs/payload-cms.md`.

## Status legend

| Status | Meaning |
|--------|---------|
| `ready` | Clear enough to draft REQ / implement |
| `blocked` | Depends on unfinished WIP |
| `parked` | Later / superseded |

---

## From review + author asks

### BL-001 — Homepage “My Work” = 3 featured; rest on `/projects`
**Status:** `ready` (partially blocked by T8 WIP)  
Homepage keeps a **My Work** section with **3 featured** projects only. **View all projects** → projects index. Individual pages at `/projects/{project_id}` (slug). Remove full listing + filter chrome from the homepage.

### BL-002 — Shared page body container under sticky/fixed navbar
**Status:** `ready`  
Reusable layout wrapper for frontend pages so content clears the fixed nav (`h-16` / `scroll-mt-*` today is ad hoc). Navbar height must reserve space so first paint content is never hidden.

### BL-003 — Footer year always current calendar year
**Status:** `ready` (trivial)  
`config.footer.year` is hardcoded `2025`. Prefer `new Date().getFullYear()` (or drop the config field).

### BL-004 — Auto-generated, non-editable slugs
**Status:** `ready`  
Slug fields on Posts / Projects / Skills: generate from title/name; admin read-only for now (future: optional unlock).

### BL-005 — Schedule timezone defaults to author local + manual override
**Status:** `ready` (after scheduling UX lands)  
Scheduled publish UI: default timezone = browser/local; dropdown to change.

### BL-006 — Shared collection **status** feature + customizable action labels
**Status:** `ready` (design needed)  
Posts, Projects (and future collections) share one status model and actions (draft / show / hide / scheduled…). Display labels are configurable per collection (e.g. project “Show” ≡ post “Publish”; project “Hide” ≡ post “Unpublish”).

### BL-007 — Projects: drop free-text `tech`; use Skills relationship only
**Status:** `ready` (conflicts with current T8 `tech` array)  
C# and peers are Skills. Public badges/filters derive from related Skills (and/or skill name), not a parallel `tech[]` string array. Aligns with plan residual Medium #5 + author intent.

### BL-008 — Scheduled posts visible as status `scheduled` + unlock-to-edit
**Status:** `ready` (extends Payload `schedulePublish`)  
Authors can list/filter **scheduled** posts. A scheduled post is **locked**; Unlock → confirm → unschedule → returns to **draft**.

---

## Plan / WIP carry-over

| ID | Item | Notes |
|----|------|-------|
| T8a | Live preview Posts + Projects | Present in uncommitted WIP |
| T8b | `schedulePublish` + jobs/cron | Present; timezone/lock UX = BL-005/008 |
| T8c | Work cutover to Payload Projects | WIP; `pnpm verify` **fails** on seed script types |
| T9 | Composition epic | Later |
| T10 | Inquiry inbox | Later, own spec |

## Legacy `.kiro/specs` disposition

| Spec | Disposition |
|------|-------------|
| `project-filtering-system` | **Done** on main; keep as historical |
| `single-project-page` | **Superseded** by Payload `/projects/[slug]` + BL-001; do not implement Keystatic-era tasks as written |
| `project-structure-refactor` | **Parked / partial**; do not resume full folder move without new spec |
| `github-project-sync` | **Parked** (empty tasks); out of Payload Now/Next |

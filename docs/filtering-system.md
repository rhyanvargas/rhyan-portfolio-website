# Project Filtering System

Multi-dimensional filtering for portfolio projects: technologies, roles, skills, domains, and search — with shareable URLs, localStorage prefs, and a mobile drawer.

## Status

**Shipped.** Spec: `.kiro/specs/project-filtering-system/`. Verify: `pnpm verify`.

| Area | Notes |
|------|--------|
| Schema | `roles`, `skillCategories`, `domains` on projects; legacy `role` kept |
| UI | Desktop collapsible panels; mobile drawer; chips; empty state; result count |
| State | `FilterProvider` + AND/OR tech mode + debounced search |
| URL | `tech`, `role`, `skill`, `domain`, `q`, `mode` — back/forward rehydrates |
| Persistence | `localStorage` key `portfolio-project-filters` (allowlisted values) |
| Tech labels | Display keeps niche labels (Zod, MUX API, …); filters use canonical `TECHNOLOGIES` |

## Architecture

```
FilterProvider
├── URL sync + localStorage
├── FilterControls / FilterChips / FilterEmptyState
└── ProjectsSection (featured + other, filtered)
```

## Key modules

| Path | Role |
|------|------|
| `contexts/filter-context.tsx` | State, actions, URL/history sync |
| `components/filters/*` | Controls, chips, empty state |
| `lib/filter-utils.ts` | Match / filter / active summary |
| `lib/tech-normalization.ts` | Display vs canonical tech |
| `lib/url-filter-sync.ts` | Query param encode/decode + allowlist |
| `lib/filter-persistence.ts` | localStorage load/save |
| `lib/project-migration.ts` | Legacy → enhanced project |
| `lib/constants.ts` | `TECHNOLOGIES`, roles, skills, domains |

## Filtering rules

- Different filter categories combine with **AND**
- Multiple technologies use **OR** or **AND** (`filterMode`)
- Roles / skills / domains within a category use **OR**
- Unknown URL/storage values are **dropped** (not applied)
- Only one filter panel instance mounts at a time (no duplicate control IDs)

## Usage

```typescript
const { state, actions } = useFilter()
actions.toggleTechnology('React')
actions.setFilterMode('AND')
const filtered = filterProjects(projects, state)
```

Shareable example: `/?tech=React,Next.js&role=Frontend&mode=AND#work`

## Tests

Vitest coverage includes filter math, migration, tech normalization, URL allowlisting, persistence, debounce, FilterChip, and empty-state clear-all.

```bash
pnpm test
pnpm verify
```

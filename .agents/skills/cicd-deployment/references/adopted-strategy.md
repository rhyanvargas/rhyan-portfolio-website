# DevOps Strategy — rhyan-portfolio-website (adopted)

Filled from the devops-strategy-facilitator template. Update this file when decisions change; keep `SKILL.md` as the operational summary.

## Goals

- Keep `main` production-ready (Vercel prod).
- Integrate ongoing work on `dev` before production promotion.
- Fail closed on quality via `pnpm verify` before claiming done / before promote.

## Non-Goals

- GitHub Actions CI pipelines (not present; optional later).
- Multi-region / multi-cloud CD.
- Calendar booking or newsletter infra as part of deploy strategy.

## Delivery Model

- **Release cadence**: on-demand promote `dev` → `main`
- **Promotion model**: Git branch promotion; Vercel rebuilds per branch (PaaS rebuild, not artifact promote)
- **Release notes**: Conventional Commits; optional release-automation later

## Branching & PR Policy

- **Branch types**: `feat/*`, `fix/*` from `dev`; long-lived `dev` + `main`
- **Merge flow**: `feat/*` → `dev` → `main`
- **PR gates**: `pnpm verify` + human review; Vercel preview build as signal

## CI (Build + Validate)

- **Triggers**: local / agent fail-closed verify; Vercel build on push/PR
- **Responsibilities**: Vitest, TypeScript, Next build (`pnpm verify`)
- **Artifacts**: Vercel deployment artifacts (no separate registry)

## CD (Deploy)

- **Environments**: Preview (non-`main` branches), Production (`main`)
- **Dev/integration**: auto preview on push to `dev` / feature branches
- **Prod**: auto on merge to `main`
- **Rollback**: redeploy previous Vercel deployment / revert merge on `main`

## Secrets & Configuration

- **Secret store**: Vercel project env + local `.env` (gitignored)
- **Config**: `.env.example` documents keys; Payload DB adapter choice documented in ADR-002

## Governance & Access

- **Who can deploy to Prod**: repo maintainers merging to `main`
- **Audit trail**: GitHub PR history + Vercel deployment history

## Observability

- **Logs/metrics**: Vercel Analytics / runtime logs; expand as Payload admin traffic grows

## Decision Log

| Area | Decision | Rationale |
|------|----------|-----------|
| Branching | feat → `dev` → `main` | Proven by PR #61/#62; keeps prod stable |
| Feature PR base | `dev` | Integration before production |
| Default branch ≠ PR base | `main` is GitHub default; not feature-PR base | Avoid shipping WIP to prod |
| CI | `pnpm verify` + Vercel | No GHA workflows yet; keep gate honest |
| CD | Vercel from `main` | Matches `docs/deployment.md` |

## Assumptions

- Solo/maintainer-driven merges; no CODEOWNERS required yet.
- Preview on `dev` is acceptable as staging signal.

## Next Steps (optional)

- Add GHA workflow mirroring `pnpm verify` on PRs to `dev`/`main`.
- Document Payload prod DB + cron secrets in `docs/deployment.md` when promoting CMS.

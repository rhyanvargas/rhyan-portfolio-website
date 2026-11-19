---
name: cicd-deployment
description: >-
  Operate this portfolio's CI/CD and deployment workflow: branch from
  and PR into dev, promote dev to main for production, verify with
  pnpm verify, and deploy via Vercel. Use when creating or updating
  pull requests, choosing a PR base branch, branching for a feature,
  promoting to production, deploying, discussing CI/CD, DevOps
  delivery for this repo, Vercel production vs preview, or when the
  user mentions feat→dev→main, integration branch, or release
  promotion. Do not use for greenfield DevOps strategy redesign
  sessions (use devops-strategy-facilitator) or changelog/release-please
  wiring (use release-automation).
---

# CI/CD deployment (this portfolio)

Adopted delivery model for **rhyan-portfolio-website**. Follow these decisions; do not invent a different branching default.

## Decision summary

| Area | Decision |
|------|----------|
| Integration branch | `dev` |
| Production branch | `main` (GitHub default; Vercel production) |
| Feature branches | Cut from **`dev`**, never from `main` unless prod-only hotfix |
| Feature PRs | Base **`dev`** (`gh pr create --base dev`) |
| Production promote | PR **`dev` → `main`** only when release-ready |
| Quality gate | `pnpm verify` (test + typecheck + build); no `.github/workflows` yet |
| CD | Vercel: **production = `main`**; **preview = other branches** |

## Branch from `dev`

```bash
git fetch origin
git checkout dev
git pull
git checkout -b feat/<short-name>
```

## Create / update a PR

When the user asks for a PR and does not name a base:

1. Ensure intended changes are committed and pushed.
2. Prefer draft if requested: `gh pr create --draft --base dev --head <branch>`.
3. Use `--base main` **only** for an explicit **promote `dev` → `main`** PR.
4. Do **not** treat “repository default branch” as the feature-PR base.

Promote PR example:

```bash
gh pr create --base main --head dev --title "…" --body "…"
```

## Pre-merge / pre-promote checklist

- [ ] `pnpm verify` green on the head branch
- [ ] No secrets in the diff (`.env`, `payload.db`, credentials)
- [ ] Feature PRs target `dev`; only promote when `dev` is the release candidate
- [ ] Vercel preview (if present) looks sane for the change

## Deploy reality

- Production URL tracks **`main`** (see `docs/deployment.md`).
- Preview deployments come from feature branches and `dev`.
- Payload/cron secrets (`PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`, DB URL) live in Vercel env — document in `.env.example`, never commit values.

## Related

- Always-on reminder: `.cursor/rules/git-workflow/RULE.md`
- Strategy redesign sessions: `devops-strategy-facilitator`
- Filled decision log: [references/adopted-strategy.md](references/adopted-strategy.md)
- Payload/runbook recovery: `troubleshoot-payload-runbook` (wrong branch, Neon migrate fail, live-db leak)

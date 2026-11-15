---
description: Branching and pull-request base for this portfolio repo
alwaysApply: true
---

# Git / PR workflow

Canonical playbook: `.agents/skills/cicd-deployment` (CI/CD deployment skill). This rule is the always-on subset for PR base selection.

## Branching

- **Integration branch:** `dev` — day-to-day work and feature PRs land here.
- **Production branch:** `main` — deploys to production (Vercel). Default GitHub branch, but **not** the usual feature-PR base.
- **Feature work:** branch from **`dev`**, never from `main` unless explicitly fixing prod-only drift.

```bash
git fetch origin
git checkout dev
git pull
git checkout -b feat/<short-name>
```

## Pull requests

| Change type | Base | Head |
|-------------|------|------|
| Feature / fix / docs for ongoing work | **`dev`** | `feat/*`, `fix/*`, etc. |
| Promote integration → production | **`main`** | `dev` |

When the user asks to “create a PR” without naming a base:

1. Prefer **`gh pr create --base dev`** (draft if requested).
2. Only use `--base main` for an explicit **promote `dev` → `main`** PR, or if the user names `main`.
3. Do **not** treat “repository default branch” as the feature-PR base in this repo.

## Deploy / CI reality (keep docs honest)

- No `.github/workflows` CI today — quality gate is local/`pnpm verify` + Vercel build.
- **Production:** Vercel from `main`.
- **Preview:** Vercel from other branches (including `dev` and feature branches).

## Do not

- Open feature PRs into `main` while Payload/CMS work is still integrating on `dev`.
- Merge `dev` → `main` until the integration branch is verified green for the release candidate.

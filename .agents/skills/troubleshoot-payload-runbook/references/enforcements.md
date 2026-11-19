# Enforcement plan (reduce runbook mis-steps)

Three layers. Prefer prevention over recovery.

## Layer 1 — Documentation (human + agent)

| Gap | Enforcement |
|-----|-------------|
| Runbook thin on `migrate:create` | Schema section links Payload Migrations + this skill |
| No `req` warning | Schema section + playbook `migration-txn` |
| SQLite “prove” ≠ Neon migrate | Explicit: local push ≠ Postgres migrate proof; first preview migrate hits Neon |
| Vague “next steps” | Playbook `ship-checklist` — only three human actions |

## Layer 2 — Agent skill (this folder)

| Mis-step | How the skill stops it |
|----------|-------------------------|
| Commit on `dev` | Iron rule + `wrong-branch` playbook moves commit to `feat/*` and resets local `dev` |
| Local API without `req` | Preflight greps migrations; `migration-txn` playbook rewrites to SQL or adds `req` |
| Seeding Neon from laptop | `live-db-leak` refuse unless user explicitly accepts prod write |
| Skills under-seeded | `content-taxonomy` points at `lib/portfolio-skills-catalog.ts` + seed/migration |

Trigger description includes: preview migrate fail, committed on dev, POSTGRES_URL leak, taxonomy wrong, “run troubleshoot payload runbook”.

## Layer 3 — Automation / scripts

| Tool | Purpose |
|------|---------|
| `scripts/preflight-schema-change.sh` | Fail closed before PR: branch name, env, verify, migration registration, `req` scan |
| `pnpm preflight:schema` | Habit alias in package.json |
| Optional later: CI job on PRs that touch `collections/` or `migrations/` | Run preflight + `pnpm verify` |

## Layer 4 — Platform (already true; keep reminding)

- Preview + production share Neon `main` (no Preview Branching).
- `push: false` on Postgres adapter; `prodMigrations` registered.
- Build command runs `payload migrate` — **first preview that migrates already mutates Neon schema**.

## What we will not do (unless asked)

- Separate Neon branch per preview (product/cost decision).
- Block all preview migrates (would strand schema PRs).
- Global install of Payload CLI.

## Rollout order

1. Ship this skill + runbook links (now).
2. Habit: agents run preflight on every schema PR.
3. `pnpm preflight:schema` wired (now).
4. Add CI check when `.github/workflows` exists.

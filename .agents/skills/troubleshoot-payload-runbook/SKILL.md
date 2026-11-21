---
name: troubleshoot-payload-runbook
description: >-
  Diagnose and fix Payload CMS + developer-runbook mis-steps for this portfolio
  (wrong branch, Neon shared DB, migration failures, Local API without req,
  incomplete skills seed). Use when a preview migrate fails, someone committed
  on dev, POSTGRES_URL leaked into local env, admin data looks wrong after a
  schema change, or the user asks to run the payload runbook troubleshoot
  skill / recover from runbook user-error.
---

# Troubleshoot Payload runbook

Project-specific recovery skill for **rhyan-portfolio-website**.  
Canonical human doc: [`docs/developer-runbook.md`](../../../docs/developer-runbook.md).  
Enforcement plan: [references/enforcements.md](references/enforcements.md).  
Payload citations: [references/payload-citations.md](references/payload-citations.md).

`.cursor/skills` is a symlink to `.agents/skills` — edit files under `.agents/skills/troubleshoot-payload-runbook/`.

## Iron rules (do not skip)

1. **Never** run `pnpm dev`, seeds, or admin experiments while `POSTGRES_URL` is set locally.
2. **Never** point local `pnpm dev` or seeds at `POSTGRES_URL`. Preview `/admin` writes the Neon branch for that Git branch ([ADR-003](../../../docs/architecture/adrs/ADR-003-neon-preview-branching.md)); they are production writes only if Preview Branching is off.
3. **Never** leave schema commits on `dev` — feature branch → PR `--base dev`.
4. In migrations: **pass `req` to Local API**, or use **`db.execute` only** inside the migration transaction ([Payload Migrations](https://payloadcms.com/docs/database/migrations)).
5. Prefer `pnpm payload migrate:create` for schema SQL; hand-written migrations must be **idempotent** and reviewed before PR.

## When the user invokes this skill

1. Identify the incident class (table below).
2. Run the matching playbook end-to-end.
3. Run [scripts/preflight-schema-change.sh](scripts/preflight-schema-change.sh) before claiming “safe to ship”.
4. Report: root cause → fix applied → what the human must do next (one short checklist).

## Incident classes

| Symptom | Class | Playbook |
|---------|-------|----------|
| Commit landed on `dev` / PR base is `main` for a feature | `wrong-branch` | [playbooks/wrong-branch.md](playbooks/wrong-branch.md) |
| Vercel `payload migrate` fails; relation missing / Local API insert | `migration-txn` | [playbooks/migration-transaction.md](playbooks/migration-transaction.md) |
| Local writes hit Neon / unexpected prod data changes | `live-db-leak` | [playbooks/live-db-leak.md](playbooks/live-db-leak.md) |
| Admin Skills/Technologies empty or role-bucket leftovers | `content-taxonomy` | [playbooks/content-taxonomy.md](playbooks/content-taxonomy.md) |
| Unclear “what next” after schema PR | `ship-checklist` | [playbooks/ship-checklist.md](playbooks/ship-checklist.md) |

If multiple match, order: `live-db-leak` → `wrong-branch` → `migration-txn` → `content-taxonomy` → `ship-checklist`.

## Preflight (every schema / CMS collection change)

Before opening or updating the PR:

```bash
bash .agents/skills/troubleshoot-payload-runbook/scripts/preflight-schema-change.sh
```

Must pass: feature branch (not `dev`/`main`), no local `POSTGRES_URL`, `pnpm verify`, migrations registered in `migrations/index.ts`, and (if Local API used in a migration) `req` is passed.

## Agent behavior when editing this repo’s CMS

When changing Payload collections, migrations, or seeds:

1. Read this skill + `docs/developer-runbook.md` **before** committing.
2. Create/use `feat/...` from `dev`; never commit schema work onto `dev`.
3. For data in migrations: SQL via `db` **or** Local API with `req` — never Local API alone.
4. After push: wait for Vercel green; tell the user only: refresh preview admin → merge to `dev` when ready.
5. Do not ask the user to experiment with CMS writes on the preview URL.

## Related skills

- `cicd-deployment` — branch/PR base rules
- `developer-runbook` — regenerating the human runbook (ask before rewrite)
- `systematic-debugging` — unknown production bugs (use after classing the incident)
- `portfolio-cms-schema` — technologies vs skills contract

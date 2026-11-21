# Playbook: ship-checklist

Use when the human asks “what next?” after a schema/CMS PR. Keep instructions to **three human actions**.

## Agent already did (confirm)

- [ ] Work is on `feat/...`, not `dev`
- [ ] PR base is `dev`
- [ ] `pnpm verify` passed locally
- [ ] Preflight script passed
- [ ] Branch pushed; Vercel status checked

## Human does next (only this)

1. **Wait** until the PR’s Vercel check is green.  
   - If red: do **not** merge — invoke playbook `migration-txn` or paste the deploy log.
2. **Open preview `/admin`** — confirm collections/fields. Edits stay on that Git branch’s Neon database, not production ([ADR-003](../../../../docs/architecture/adrs/ADR-003-neon-preview-branching.md)).
3. **Merge the PR into `dev`** when satisfied.

## After merge to `dev`

- Leave on `dev` until ready to release. The `dev` preview uses its own Neon branch.
- Production: open PR **`dev` → `main`** only when releasing. That deploy migrates the Neon **production** branch. Preview migrates do not apply to production.

## Phrasing template for the agent

> Vercel is green on PR #N.  
> Your only steps: (1) skim preview `/admin` (that branch’s database), (2) merge into `dev`, (3) stop.  
> Do not point a laptop at `POSTGRES_URL`. Production content changes only on rhyan.dev `/admin` or a `main` deploy.

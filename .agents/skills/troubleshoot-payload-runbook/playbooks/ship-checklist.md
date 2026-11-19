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
2. **Open preview `/admin` read-only** — confirm collections/fields look right. Do not create test documents.
3. **Merge the PR into `dev`** when satisfied.

## After merge to `dev`

- Leave on `dev` until ready to release.
- Production: open PR **`dev` → `main`** only when releasing (same Neon; migrate already applied on first preview that ran `build:vercel`).

## Phrasing template for the agent

> Vercel is green on PR #N.  
> Your only steps: (1) skim preview `/admin` read-only, (2) merge into `dev`, (3) stop.  
> Do not seed or edit CMS on the preview URL.

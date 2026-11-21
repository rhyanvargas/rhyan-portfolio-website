# Playbook: live-db-leak

## Symptoms

- Local `pnpm dev` or seed changed production CMS content
- `.env` / `.env.local` contains `POSTGRES_URL` after `vercel env pull`
- User expected a preview `/admin` edit to show up on rhyan.dev (or the reverse)

## Immediate stop

1. Do **not** continue seeding or deleting against a Neon URL from the laptop.
2. Check:
   ```bash
   grep -E '^POSTGRES_URL=' .env .env.local 2>/dev/null || true
   ```
3. If set: remove `POSTGRES_URL` from local env files. Keep `DATABASE_URL=file:./payload.db` (or equivalent file URL).

## Recover

| What leaked | Action |
|-------------|--------|
| Local pointed at Neon production | Stop; strip `POSTGRES_URL`; restart `pnpm dev` on SQLite. Undo bad rows on production `/admin` if needed |
| Preview admin test rows | Those rows live on that Git branch’s Neon database ([ADR-003](../../../../docs/architecture/adrs/ADR-003-neon-preview-branching.md)). Delete them on the preview `/admin`. They are not production unless Preview Branching is still off |
| Accidental migrate on production | Do not roll back casually; fix forward with a new migration. A preview migrate only touches the preview branch when branching is on |

## Prevention

- Never commit `.env` / `.env.local`
- After `vercel env pull`, strip `POSTGRES_URL` before `pnpm dev`
- Preview Branching must stay **Preview only**. If it is off, treat every preview CMS write as a production write

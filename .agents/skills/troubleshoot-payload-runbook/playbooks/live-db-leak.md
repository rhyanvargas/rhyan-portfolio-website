# Playbook: live-db-leak

## Symptoms

- Local `pnpm dev` or seed changed production/preview CMS content
- `.env` / `.env.local` contains `POSTGRES_URL` after `vercel env pull`
- User edited preview `/admin` “just to test”

## Immediate stop

1. Do **not** continue seeding or deleting on that environment.
2. Check:
   ```bash
   grep -E '^POSTGRES_URL=' .env .env.local 2>/dev/null || true
   ```
3. If set: remove `POSTGRES_URL` from local env files. Keep `DATABASE_URL=file:./payload.db` (or equivalent file URL).

## Recover

| What leaked | Action |
|-------------|--------|
| Local pointed at Neon | Stop; strip `POSTGRES_URL`; restart `pnpm dev` on SQLite |
| Preview admin test rows | Delete those rows on **production** `/admin` (same DB) or restore from backup if available |
| Accidental migrate | Do not roll back casually; fix forward with a new migration |

## Prevention

- Never commit `.env` / `.env.local`
- After `vercel env pull`, strip `POSTGRES_URL` before `pnpm dev`
- Preview admin = production data (runbook table)

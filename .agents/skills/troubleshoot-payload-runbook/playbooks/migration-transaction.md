# Playbook: migration-txn

## Symptoms

- Vercel build: `payload migrate` fails
- Error like `relation "<table>" does not exist` while inserting via Local API
- Stack points at `payload.create` / `payload.update` inside `migrations/*.ts`

## Root cause (expected)

Migration DDL runs in the migration transaction. Local API **without `req`** uses another connection and cannot see uncommitted tables. See [payload-citations.md](../references/payload-citations.md).

## Fix (agent)

1. Pull deploy logs (`npx vercel inspect <dpl> --logs` or Vercel MCP).
2. Open the failing migration.
3. Choose one (prefer A for DDL+data in one file):
   - **A (preferred for backfills):** rewrite creates/updates/deletes to `db.execute(sql\`...\`)` only; make statements idempotent (`IF NOT EXISTS`, `ON CONFLICT`, existence checks).
   - **B:** keep Local API but pass `req` on every `payload.*` call; ensure DDL is committed/visible (still prefer SQL for brand-new tables created in the same `up`).
4. Register the file in `migrations/index.ts` if new.
5. Commit on the feature branch, push, wait for Vercel green.

## Do not

- Re-run a broken migrate by seeding Neon from a laptop with `POSTGRES_URL`
- Use `migrate:fresh` against Neon
- Amend already-pushed commits unless the user explicitly asks and amend rules allow it

## Verify

- Vercel check SUCCESS for the PR
- Preview `/admin` loads new collections without 500s

# Payload docs this skill relies on

Use these when explaining *why* a playbook step exists. Do not invent stricter rules than the docs.

## Migrations + transactions

Source: [Migrations](https://payloadcms.com/docs/database/migrations)

- Each migration runs in a **new transaction** when the adapter supports transactions.
- **Pass `req` to Local API** (or `payload.db.*`) so work joins that transaction.
- You may **bypass Payload’s layer** and use `db.execute(sql\`...\`)` on Postgres inside the migration.
- Recommended Postgres flow: local **push** while developing → `payload migrate:create` → run `payload migrate` in CI before build.
- Warning: do not mix push and migrate against the **same** development database carelessly.

## Postgres adapter

Source: [Postgres](https://payloadcms.com/docs/database/postgres)

- Development often uses Drizzle **push**; production uses **migrations**.
- This repo: local SQLite (push), Neon Postgres (`push: false` + migrations).

## Transactions (general)

Source: [Transactions](https://payloadcms.com/docs/database/transactions)

- Nested operations stay in one transaction when you pass `req`.
- Without sharing the transaction, later failures can leave earlier work visible (or Local API can fail to see uncommitted DDL).

## How this maps to Nov 2026 incident

| What happened | Doc match |
|---------------|-----------|
| `payload.create` in migration without `req` → `relation "technologies" does not exist` | Local API outside migration transaction |
| Fix: SQL-only upserts via `db.execute` | Documented “bypass Payload’s layer” |
| Alternate fix: `payload.create({ ..., req })` | Documented “pass req” |
| `build:vercel` = migrate then build | Documented CI migrate-before-build pattern |

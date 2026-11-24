# Other stacks

Read only when the detected tool has no dedicated reference (Strapi, Directus, Drizzle, TypeORM, Mongoose, SQL).

Match the tool already in the repo. Do not add a second CMS or ORM. Use that tool's naming for the logical fields in `SKILL.md`.

| Stack | Shape |
|-------|--------|
| Document CMS (Strapi, Directus) | One config module per collection. Native reference fields. Admin display title is `title` or `name`. |
| Relational ORM or SQL (Drizzle, TypeORM, Mongoose, SQL) | Normalized tables. Explicit or implicit many-to-many join tables. Unique constraints on `slug` and `name`. |

Keep unrelated columns or attributes already on the project entity.

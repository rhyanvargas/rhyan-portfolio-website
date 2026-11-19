---
name: portfolio-cms-schema
description: >-
  Keep portfolio technologies (tools) separate from skills (capabilities) and
  relate both to projects in whatever CMS or ORM the repo already uses. Use
  when designing, migrating, or querying portfolio collections, tech badges,
  technology filters, or a combined tags list. Do not use for case-study copy,
  visual layout, blog posts, auth, deploy/CI, resume wording, or architecture
  diagrams.
---

# Portfolio CMS schema

Technologies are installable tools. Skills are methods. Projects link to both. Never store both in one `tags`, `tech`, or `skills` list.

The field lists below are the logical contract. They do not replace unrelated project fields already in the schema.

## Before writing schema

1. Read `package.json` and the existing collection or schema files. Match that tool's types, relations, validation, and naming (`camelCase` or `snake_case`, not both).
2. Put new files in the existing collections or schemas directory and register them on the config entrypoint.
3. Load exactly one stack reference before writing fields:

| Detected stack | Read |
|----------------|------|
| `payload` dependency or `CollectionConfig` | `references/payload.md` |
| `prisma` schema or `@prisma/client` | `references/prisma.md` |
| `sanity` dependency or `defineType` documents | `references/sanity.md` |
| Anything else (Strapi, Directus, Drizzle, Mongoose, SQL) | `references/stack-idioms.md` |

## Collections

### projects

`title`, `slug` (unique), `summary` (card text), `content` (case study), optional `liveUrl` and `repoUrl`, `technologies` (many-to-many), `skills` (many-to-many).

### technologies

`name` (unique), `slug` (unique), `category` (`frontend` | `backend` | `database` | `devops` | `design` | `other`), optional `icon`, `isFeatured` (default false; homepage and about stack only).

Tools only: languages, frameworks, databases, infrastructure, design tools (`React`, `PostgreSQL`, `Docker`, `Figma`).

### skills

`name` (unique), `slug` (unique), `domain` (`architecture` | `performance` | `security` | `methodology` | `product` | `other`), optional `description`.

Capabilities only: methods and concepts (`REST API Design`, `CI/CD`, `State Management`, `Accessibility`).

Add a skills-to-technologies many-to-many only when the UI groups tools under one competency.

## UI

- Cards and grids: technologies only, at most 3–5. Do not render skills.
- Detail: technologies under Built With / Tech Stack. Skills under Key Concepts / Skills Applied.
- Primary filters: technologies grouped by `category`. Do not build the main filter bar from skills.

## Migration

When splitting a combined tags, `tech`, or skills field, write a seed or migration that classifies each row. Do not drop rows. Load `references/classification.md` when a row could be either a tool or a capability.

## Progressive disclosure

| Reference | When to read |
|-----------|----------------|
| `references/payload.md` | Detected stack is Payload |
| `references/prisma.md` | Detected stack is Prisma |
| `references/sanity.md` | Detected stack is Sanity |
| `references/stack-idioms.md` | Detected stack has no dedicated reference |
| `references/classification.md` | A migration row is ambiguous, or someone asks to file a tool under skills |

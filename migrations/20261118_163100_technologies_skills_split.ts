import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

import { classifyLabel } from '../lib/portfolio-cms-classification'

type TechRow = {
  parent_id: number
  item: string
  order: number
}

type IdRow = { id: number }
type SkillRow = { id: number; slug: string }
type ExistsRow = { exists: boolean }

function asRows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  if (result && typeof result === 'object' && 'rows' in result) {
    const rows = (result as { rows: unknown }).rows
    if (Array.isArray(rows)) return rows as T[]
  }
  return []
}

function firstId(result: unknown): number | null {
  const row = asRows<IdRow>(result)[0]
  return row ? Number(row.id) : null
}

async function tableExists(
  db: MigrateUpArgs['db'],
  table: string,
): Promise<boolean> {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ${table}
    ) AS "exists"
  `)
  return Boolean(asRows<ExistsRow>(result)[0]?.exists)
}

async function columnExists(
  db: MigrateUpArgs['db'],
  table: string,
  column: string,
): Promise<boolean> {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = ${table}
        AND column_name = ${column}
    ) AS "exists"
  `)
  return Boolean(asRows<ExistsRow>(result)[0]?.exists)
}

/**
 * Schema + data: free-text projects_tech → technologies relation;
 * skills.category (role buckets) → skills.domain (capability domains).
 *
 * Uses SQL only (no Local API) so inserts see DDL in the same migration transaction.
 * Statements are idempotent for a retriable failed preview deploy.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_technologies_category" AS ENUM('frontend', 'backend', 'database', 'devops', 'design', 'other');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_skills_domain" AS ENUM('architecture', 'performance', 'security', 'methodology', 'product', 'other');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "technologies" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "category" "enum_technologies_category" NOT NULL,
      "icon" varchar,
      "is_featured" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "technologies_name_idx" ON "technologies" USING btree ("name")`)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "technologies_slug_idx" ON "technologies" USING btree ("slug")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "technologies_updated_at_idx" ON "technologies" USING btree ("updated_at")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "technologies_created_at_idx" ON "technologies" USING btree ("created_at")`)

  if (!(await columnExists(db, 'projects', 'content'))) {
    await db.execute(sql`ALTER TABLE "projects" ADD COLUMN "content" jsonb`)
  }

  if (!(await columnExists(db, 'projects_rels', 'technologies_id'))) {
    await db.execute(sql`ALTER TABLE "projects_rels" ADD COLUMN "technologies_id" integer`)
    await db.execute(sql`
      ALTER TABLE "projects_rels"
      ADD CONSTRAINT "projects_rels_technologies_fk"
      FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id")
      ON DELETE cascade ON UPDATE no action
    `)
    await db.execute(sql`CREATE INDEX "projects_rels_technologies_id_idx" ON "projects_rels" USING btree ("technologies_id")`)
  }

  if (!(await columnExists(db, 'payload_locked_documents_rels', 'technologies_id'))) {
    await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "technologies_id" integer`)
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk"
      FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id")
      ON DELETE cascade ON UPDATE no action
    `)
    await db.execute(sql`CREATE INDEX "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id")`)
  }

  if (!(await columnExists(db, 'skills', 'domain'))) {
    await db.execute(sql`ALTER TABLE "skills" ADD COLUMN "domain" "enum_skills_domain"`)
  }
  if (!(await columnExists(db, 'skills', 'description'))) {
    await db.execute(sql`ALTER TABLE "skills" ADD COLUMN "description" varchar`)
  }

  await db.execute(sql`UPDATE "skills" SET "domain" = 'other' WHERE "domain" IS NULL`)
  await db.execute(sql`ALTER TABLE "skills" ALTER COLUMN "domain" SET NOT NULL`)

  if (await columnExists(db, 'skills', 'category')) {
    await db.execute(sql`ALTER TABLE "skills" DROP COLUMN "category"`)
  }
  await db.execute(sql`
    DO $$ BEGIN
      DROP TYPE "public"."enum_skills_category";
    EXCEPTION WHEN undefined_object THEN NULL;
    END $$
  `)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "skills_name_idx" ON "skills" USING btree ("name")`)

  const techIdBySlug = new Map<string, number>()
  const skillIdBySlug = new Map<string, number>()
  const classifiedSkillSlugs = new Set<string>()

  for (const skill of asRows<SkillRow>(
    await db.execute(sql`SELECT "id", "slug" FROM "skills"`),
  )) {
    skillIdBySlug.set(skill.slug, Number(skill.id))
  }

  for (const tech of asRows<{ id: number; slug: string }>(
    await db.execute(sql`SELECT "id", "slug" FROM "technologies"`),
  )) {
    techIdBySlug.set(tech.slug, Number(tech.id))
  }

  async function ensureTechnology(name: string, slug: string, category: string): Promise<number> {
    const existing = techIdBySlug.get(slug)
    if (existing) return existing

    const inserted = await db.execute(sql`
      INSERT INTO "technologies" ("name", "slug", "category", "is_featured", "updated_at", "created_at")
      VALUES (${name}, ${slug}, ${category}::"enum_technologies_category", false, now(), now())
      ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name"
      RETURNING "id"
    `)
    const id = firstId(inserted)
    if (id == null) throw new Error(`Failed to upsert technology ${slug}`)
    techIdBySlug.set(slug, id)
    return id
  }

  async function ensureSkill(
    name: string,
    slug: string,
    domain: string,
    description?: string,
  ): Promise<number> {
    classifiedSkillSlugs.add(slug)
    const existing = skillIdBySlug.get(slug)
    if (existing) {
      await db.execute(sql`
        UPDATE "skills"
        SET
          "name" = ${name},
          "domain" = ${domain}::"enum_skills_domain",
          "description" = ${description ?? null},
          "updated_at" = now()
        WHERE "id" = ${existing}
      `)
      return existing
    }

    const inserted = await db.execute(sql`
      INSERT INTO "skills" ("name", "slug", "domain", "description", "updated_at", "created_at")
      VALUES (${name}, ${slug}, ${domain}::"enum_skills_domain", ${description ?? null}, now(), now())
      ON CONFLICT ("slug") DO UPDATE SET
        "name" = EXCLUDED."name",
        "domain" = EXCLUDED."domain",
        "description" = EXCLUDED."description"
      RETURNING "id"
    `)
    const id = firstId(inserted)
    if (id == null) throw new Error(`Failed to upsert skill ${slug}`)
    skillIdBySlug.set(slug, id)
    return id
  }

  if (await tableExists(db, 'projects_tech')) {
    const rows = asRows<TechRow>(
      await db.execute(sql`
        SELECT "_parent_id" AS parent_id, "item", "_order" AS "order"
        FROM "projects_tech"
        ORDER BY "_parent_id", "_order"
      `),
    )

    // Avoid duplicating relation rows if a prior attempt partially linked projects.
    await db.execute(sql`
      DELETE FROM "projects_rels"
      WHERE "path" = 'technologies' AND "technologies_id" IS NOT NULL
    `)

    const relOrderByProject = new Map<number, number>()

    for (const row of rows) {
      const classified = classifyLabel(String(row.item))
      const projectId = Number(row.parent_id)
      let order = relOrderByProject.get(projectId) ?? 0

      for (const tech of classified.technologies) {
        const techId = await ensureTechnology(tech.name, tech.slug, tech.category)
        await db.execute(sql`
          INSERT INTO "projects_rels" ("order", "parent_id", "path", "technologies_id")
          VALUES (${order}, ${projectId}, 'technologies', ${techId})
        `)
        order += 1
      }

      for (const skill of classified.skills) {
        const skillId = await ensureSkill(
          skill.name,
          skill.slug,
          skill.domain,
          skill.description,
        )
        await db.execute(sql`
          INSERT INTO "projects_rels" ("order", "parent_id", "path", "skills_id")
          VALUES (${order}, ${projectId}, 'skills', ${skillId})
        `)
        order += 1
      }

      relOrderByProject.set(projectId, order)
    }

    await db.execute(sql`DROP TABLE "projects_tech"`)
  }

  // Drop role-bucket / mistaken tool-as-skill docs; keep classified capabilities.
  const legacySlugs = new Set([
    'frontend-development',
    'backend-development',
    'full-stack-development',
    'ai-machine-learning',
    'devops-infrastructure',
    'mobile-development',
    'game-development',
    'ui-ux-design',
    'data-engineering',
    'api-development',
    'react',
  ])

  for (const skill of asRows<SkillRow>(
    await db.execute(sql`SELECT "id", "slug" FROM "skills"`),
  )) {
    const keep =
      classifiedSkillSlugs.size > 0
        ? classifiedSkillSlugs.has(skill.slug)
        : !legacySlugs.has(skill.slug)
    if (keep) continue
    await db.execute(sql`DELETE FROM "skills" WHERE "id" = ${Number(skill.id)}`)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_skills_category" AS ENUM(
        'Frontend Development',
        'Backend Development',
        'Full Stack Development',
        'AI/Machine Learning',
        'DevOps/Infrastructure',
        'Mobile Development',
        'Game Development',
        'UI/UX Design',
        'Data Engineering',
        'API Development'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "projects_tech" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar NOT NULL
    )
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "projects_tech" ADD CONSTRAINT "projects_tech_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "projects_tech_order_idx" ON "projects_tech" USING btree ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "projects_tech_parent_id_idx" ON "projects_tech" USING btree ("_parent_id")`)

  await db.execute(sql`
    INSERT INTO "projects_tech" ("id", "_order", "_parent_id", "item")
    SELECT
      gen_random_uuid()::varchar,
      COALESCE(pr."order", 0),
      pr."parent_id",
      t."name"
    FROM "projects_rels" pr
    INNER JOIN "technologies" t ON t."id" = pr."technologies_id"
    WHERE pr."path" = 'technologies'
  `)

  if (!(await columnExists(db, 'skills', 'category'))) {
    await db.execute(sql`ALTER TABLE "skills" ADD COLUMN "category" "enum_skills_category"`)
  }
  await db.execute(sql`UPDATE "skills" SET "category" = 'Full Stack Development' WHERE "category" IS NULL`)
  await db.execute(sql`ALTER TABLE "skills" ALTER COLUMN "category" SET NOT NULL`)
  if (await columnExists(db, 'skills', 'domain')) {
    await db.execute(sql`ALTER TABLE "skills" DROP COLUMN "domain"`)
  }
  if (await columnExists(db, 'skills', 'description')) {
    await db.execute(sql`ALTER TABLE "skills" DROP COLUMN "description"`)
  }
  await db.execute(sql`DROP INDEX IF EXISTS "skills_name_idx"`)

  await db.execute(sql`ALTER TABLE "projects_rels" DROP CONSTRAINT IF EXISTS "projects_rels_technologies_fk"`)
  await db.execute(sql`DROP INDEX IF EXISTS "projects_rels_technologies_id_idx"`)
  if (await columnExists(db, 'projects_rels', 'technologies_id')) {
    await db.execute(sql`ALTER TABLE "projects_rels" DROP COLUMN "technologies_id"`)
  }

  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_technologies_fk"`)
  await db.execute(sql`DROP INDEX IF EXISTS "payload_locked_documents_rels_technologies_id_idx"`)
  if (await columnExists(db, 'payload_locked_documents_rels', 'technologies_id')) {
    await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "technologies_id"`)
  }

  if (await columnExists(db, 'projects', 'content')) {
    await db.execute(sql`ALTER TABLE "projects" DROP COLUMN "content"`)
  }

  await db.execute(sql`DROP TABLE IF EXISTS "technologies"`)
  await db.execute(sql`
    DO $$ BEGIN
      DROP TYPE "public"."enum_technologies_category";
    EXCEPTION WHEN undefined_object THEN NULL;
    END $$
  `)
  await db.execute(sql`
    DO $$ BEGIN
      DROP TYPE "public"."enum_skills_domain";
    EXCEPTION WHEN undefined_object THEN NULL;
    END $$
  `)
}

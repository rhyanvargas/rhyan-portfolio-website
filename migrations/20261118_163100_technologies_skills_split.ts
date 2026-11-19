import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

import { classifyLabel } from '../lib/portfolio-cms-classification'

type TechRow = {
  parent_id: number
  item: string
  order: number
}

type SkillRow = {
  id: number
  name: string
  slug: string
}

function asRows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  if (result && typeof result === 'object' && 'rows' in result) {
    const rows = (result as { rows: unknown }).rows
    if (Array.isArray(rows)) return rows as T[]
  }
  return []
}

/**
 * Schema + data: free-text projects_tech → technologies relation;
 * skills.category (role buckets) → skills.domain (capability domains).
 * Classifies each tech label; does not drop tool or capability halves.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_technologies_category" AS ENUM('frontend', 'backend', 'database', 'devops', 'design', 'other');
    CREATE TYPE "public"."enum_skills_domain" AS ENUM('architecture', 'performance', 'security', 'methodology', 'product', 'other');

    CREATE TABLE "technologies" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "category" "enum_technologies_category" NOT NULL,
      "icon" varchar,
      "is_featured" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX "technologies_name_idx" ON "technologies" USING btree ("name");
    CREATE UNIQUE INDEX "technologies_slug_idx" ON "technologies" USING btree ("slug");
    CREATE INDEX "technologies_updated_at_idx" ON "technologies" USING btree ("updated_at");
    CREATE INDEX "technologies_created_at_idx" ON "technologies" USING btree ("created_at");

    ALTER TABLE "projects" ADD COLUMN "content" jsonb;

    ALTER TABLE "projects_rels" ADD COLUMN "technologies_id" integer;
    ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "projects_rels_technologies_id_idx" ON "projects_rels" USING btree ("technologies_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "technologies_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id");

    ALTER TABLE "skills" ADD COLUMN "domain" "enum_skills_domain";
    ALTER TABLE "skills" ADD COLUMN "description" varchar;
  `)

  // Role-bucket category values are not skill domains — park then drop the old enum.
  await db.execute(sql`
    UPDATE "skills" SET "domain" = 'other' WHERE "domain" IS NULL;
    ALTER TABLE "skills" ALTER COLUMN "domain" SET NOT NULL;
    ALTER TABLE "skills" DROP COLUMN "category";
    DROP TYPE "public"."enum_skills_category";
    CREATE UNIQUE INDEX "skills_name_idx" ON "skills" USING btree ("name");
  `)

  const techResult = await db.execute(sql`
    SELECT "_parent_id" AS parent_id, "item", "_order" AS "order"
    FROM "projects_tech"
    ORDER BY "_parent_id", "_order"
  `)
  const rows = asRows<TechRow>(techResult)

  const techIdBySlug = new Map<string, number>()
  const skillIdBySlug = new Map<string, number>()
  const classifiedSkillSlugs = new Set<string>()

  for (const skill of asRows<SkillRow>(
    await db.execute(sql`SELECT "id", "name", "slug" FROM "skills"`),
  )) {
    skillIdBySlug.set(skill.slug, Number(skill.id))
  }

  async function ensureTechnology(name: string, slug: string, category: string): Promise<number> {
    const existing = techIdBySlug.get(slug)
    if (existing) return existing

    const created = await payload.create({
      collection: 'technologies',
      data: {
        name,
        slug,
        category: category as
          | 'frontend'
          | 'backend'
          | 'database'
          | 'devops'
          | 'design'
          | 'other',
        isFeatured: false,
      },
      overrideAccess: true,
    })
    const id = Number(created.id)
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
      await payload.update({
        collection: 'skills',
        id: existing,
        data: {
          name,
          domain: domain as
            | 'architecture'
            | 'performance'
            | 'security'
            | 'methodology'
            | 'product'
            | 'other',
          description,
        },
        overrideAccess: true,
      })
      return existing
    }

    const created = await payload.create({
      collection: 'skills',
      data: {
        name,
        slug,
        domain: domain as
          | 'architecture'
          | 'performance'
          | 'security'
          | 'methodology'
          | 'product'
          | 'other',
        description,
      },
      overrideAccess: true,
    })
    const id = Number(created.id)
    skillIdBySlug.set(slug, id)
    return id
  }

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

  // Drop role-bucket / mistaken tool-as-skill docs; keep classified capabilities.
  for (const skill of asRows<SkillRow>(
    await db.execute(sql`SELECT "id", "name", "slug" FROM "skills"`),
  )) {
    if (classifiedSkillSlugs.has(skill.slug)) continue
    await payload.delete({
      collection: 'skills',
      id: skill.id,
      overrideAccess: true,
    })
  }

  await db.execute(sql`
    DROP TABLE "projects_tech";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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

    CREATE TABLE "projects_tech" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar NOT NULL
    );

    ALTER TABLE "projects_tech" ADD CONSTRAINT "projects_tech_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "projects_tech_order_idx" ON "projects_tech" USING btree ("_order");
    CREATE INDEX "projects_tech_parent_id_idx" ON "projects_tech" USING btree ("_parent_id");

    INSERT INTO "projects_tech" ("id", "_order", "_parent_id", "item")
    SELECT
      gen_random_uuid()::varchar,
      COALESCE(pr."order", 0),
      pr."parent_id",
      t."name"
    FROM "projects_rels" pr
    INNER JOIN "technologies" t ON t."id" = pr."technologies_id"
    WHERE pr."path" = 'technologies';

    ALTER TABLE "skills" ADD COLUMN "category" "enum_skills_category";
    UPDATE "skills" SET "category" = 'Full Stack Development' WHERE "category" IS NULL;
    ALTER TABLE "skills" ALTER COLUMN "category" SET NOT NULL;
    ALTER TABLE "skills" DROP COLUMN "domain";
    ALTER TABLE "skills" DROP COLUMN "description";
    DROP INDEX IF EXISTS "skills_name_idx";

    ALTER TABLE "projects_rels" DROP CONSTRAINT IF EXISTS "projects_rels_technologies_fk";
    DROP INDEX IF EXISTS "projects_rels_technologies_id_idx";
    ALTER TABLE "projects_rels" DROP COLUMN IF EXISTS "technologies_id";

    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_technologies_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_technologies_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "technologies_id";

    ALTER TABLE "projects" DROP COLUMN IF EXISTS "content";

    DROP TABLE "technologies";
    DROP TYPE "public"."enum_technologies_category";
    DROP TYPE "public"."enum_skills_domain";
  `)
}

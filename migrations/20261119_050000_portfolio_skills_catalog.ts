import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

import {
  PORTFOLIO_SKILLS_CATALOG,
  PROJECT_SKILL_SLUGS,
} from '../lib/portfolio-skills-catalog'

type IdSlugRow = { id: number; slug: string }

function asRows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  if (result && typeof result === 'object' && 'rows' in result) {
    const rows = (result as { rows: unknown }).rows
    if (Array.isArray(rows)) return rows as T[]
  }
  return []
}

function firstId(result: unknown): number | null {
  const row = asRows<{ id: number }>(result)[0]
  return row ? Number(row.id) : null
}

/**
 * Backfill recruiter-facing skills and project relations.
 * Idempotent: safe to re-run; does not drop technologies.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const skillIdBySlug = new Map<string, number>()

  for (const skill of PORTFOLIO_SKILLS_CATALOG) {
    const inserted = await db.execute(sql`
      INSERT INTO "skills" ("name", "slug", "domain", "description", "updated_at", "created_at")
      VALUES (
        ${skill.name},
        ${skill.slug},
        ${skill.domain}::"enum_skills_domain",
        ${skill.description},
        now(),
        now()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "name" = EXCLUDED."name",
        "domain" = EXCLUDED."domain",
        "description" = EXCLUDED."description",
        "updated_at" = now()
      RETURNING "id"
    `)
    const id = firstId(inserted)
    if (id == null) throw new Error(`Failed to upsert skill ${skill.slug}`)
    skillIdBySlug.set(skill.slug, id)
  }

  // Also keep any existing classifier skills keyed by slug.
  for (const row of asRows<IdSlugRow>(
    await db.execute(sql`SELECT "id", "slug" FROM "skills"`),
  )) {
    if (!skillIdBySlug.has(row.slug)) {
      skillIdBySlug.set(row.slug, Number(row.id))
    }
  }

  const projects = asRows<IdSlugRow>(
    await db.execute(sql`SELECT "id", "slug" FROM "projects"`),
  )

  for (const project of projects) {
    const skillSlugs = PROJECT_SKILL_SLUGS[project.slug]
    if (!skillSlugs?.length) continue

    // Replace catalog-managed skill links for this project; keep technology rels.
    await db.execute(sql`
      DELETE FROM "projects_rels"
      WHERE "parent_id" = ${Number(project.id)}
        AND "path" = 'skills'
    `)

    let order = 0
    for (const skillSlug of skillSlugs) {
      const skillId = skillIdBySlug.get(skillSlug)
      if (skillId == null) {
        throw new Error(`Missing skill ${skillSlug} for project ${project.slug}`)
      }
      await db.execute(sql`
        INSERT INTO "projects_rels" ("order", "parent_id", "path", "skills_id")
        VALUES (${order}, ${Number(project.id)}, 'skills', ${skillId})
      `)
      order += 1
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const catalogSlugs = PORTFOLIO_SKILLS_CATALOG.map((skill) => skill.slug)

  // Keep Accessibility + ScriptableObject if they came from tech classification;
  // only remove purely catalog-added skills that are not those two.
  const removable = catalogSlugs.filter(
    (slug) =>
      slug !== 'accessibility' && slug !== 'scriptableobject-architecture',
  )

  for (const slug of removable) {
    await db.execute(sql`
      DELETE FROM "projects_rels"
      WHERE "path" = 'skills'
        AND "skills_id" IN (SELECT "id" FROM "skills" WHERE "slug" = ${slug})
    `)
    await db.execute(sql`DELETE FROM "skills" WHERE "slug" = ${slug}`)
  }
}

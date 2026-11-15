/**
 * Upsert Skills + Projects from the pre-cutover portfolio snapshot into Payload.
 * Usage: pnpm exec tsx scripts/seed-projects-from-portfolio.ts
 */
import { getPayload } from 'payload'

import config from '../payload.config'
import { portfolioProjectsSnapshot } from './portfolio-projects.snapshot'

function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  const payload = await getPayload({ config })
  const skillIdByCategory = new Map<string, number | string>()

  const categories = new Set<string>()
  for (const project of portfolioProjectsSnapshot) {
    for (const category of project.skillCategories ?? []) {
      categories.add(category)
    }
  }

  for (const category of categories) {
    const slug = categorySlug(category)
    const existing = await payload.find({
      collection: 'skills',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const skill =
      existing.docs[0] ??
      (await payload.create({
        collection: 'skills',
        data: {
          name: category,
          slug,
          category: category as
            | 'Frontend Development'
            | 'Backend Development'
            | 'Full Stack Development'
            | 'AI/Machine Learning'
            | 'DevOps/Infrastructure'
            | 'Mobile Development'
            | 'Game Development'
            | 'UI/UX Design'
            | 'Data Engineering'
            | 'API Development',
        },
      }))

    skillIdByCategory.set(category, skill.id)
  }

  let upserted = 0

  for (const project of portfolioProjectsSnapshot) {
    const skillIds = (project.skillCategories ?? [])
      .map((category) => skillIdByCategory.get(category))
      .filter((id): id is number | string => id !== undefined)

    if (skillIds.length === 0) {
      throw new Error(`Project ${project.slug} has no resolvable skills`)
    }

    const data = {
      title: project.title,
      slug: project.slug,
      displayOrder: project.id,
      summary: project.summary,
      highlights: project.highlights.map((item) => ({ item })),
      tech: project.tech.map((item) => ({ item })),
      roles: project.roles,
      domains: project.domains ?? [],
      links: {
        demo: project.links?.demo,
        repo: project.links?.repo,
        evidence: project.links?.evidence,
      },
      metrics: project.metrics?.map((metric) => ({
        label: metric.label,
        value: metric.value,
      })),
      thumbnail: project.thumbnail,
      featured: Boolean(project.isFeatured),
      skills: skillIds,
    }

    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: 'projects',
        data,
      })
    }

    upserted += 1
  }

  // Remove the Now-slice placeholder if present and not in the snapshot.
  const seed = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'seed-project' } },
    limit: 1,
  })
  if (seed.docs[0] && !portfolioProjectsSnapshot.some((p) => p.slug === 'seed-project')) {
    await payload.delete({
      collection: 'projects',
      id: seed.docs[0].id,
    })
  }

  console.log(
    JSON.stringify(
      {
        skills: skillIdByCategory.size,
        projectsUpserted: upserted,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

/**
 * Upsert Technologies + Skills + Projects from the pre-cutover portfolio snapshot.
 * Classifies legacy `tech[]` labels into tools vs methods (never drops rows).
 * Usage: pnpm exec tsx scripts/seed-projects-from-portfolio.ts
 */
import { getPayload } from 'payload'

import { classifyLabels } from '../lib/portfolio-cms-classification'
import config from '../payload.config'
import { portfolioProjectsSnapshot } from './portfolio-projects.snapshot'

export async function seedProjectsFromPortfolio() {
  const payload = await getPayload({ config })

  const allLabels = portfolioProjectsSnapshot.flatMap((project) => [...project.tech])
  const { technologies: classifiedTech, skills: classifiedSkills } =
    classifyLabels(allLabels)

  const technologyIdBySlug = new Map<string, number>()
  const skillIdBySlug = new Map<string, number>()

  for (const tech of classifiedTech) {
    const existing = await payload.find({
      collection: 'technologies',
      where: { slug: { equals: tech.slug } },
      limit: 1,
    })

    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'technologies',
        data: {
          name: tech.name,
          slug: tech.slug,
          category: tech.category,
          isFeatured: false,
        },
      }))

    if (existing.docs[0]) {
      await payload.update({
        collection: 'technologies',
        id: existing.docs[0].id,
        data: {
          name: tech.name,
          category: tech.category,
        },
      })
    }

    technologyIdBySlug.set(tech.slug, Number(doc.id))
  }

  for (const skill of classifiedSkills) {
    const existing = await payload.find({
      collection: 'skills',
      where: { slug: { equals: skill.slug } },
      limit: 1,
    })

    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: 'skills',
        data: {
          name: skill.name,
          slug: skill.slug,
          domain: skill.domain,
          description: skill.description,
        },
      }))

    if (existing.docs[0]) {
      await payload.update({
        collection: 'skills',
        id: existing.docs[0].id,
        data: {
          name: skill.name,
          domain: skill.domain,
          description: skill.description,
        },
      })
    }

    skillIdBySlug.set(skill.slug, Number(doc.id))
  }

  // Role-bucket labels previously stored as Skills are not capabilities — remove them.
  const legacySkillSlugs = [
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
  ]

  for (const slug of legacySkillSlugs) {
    const legacy = await payload.find({
      collection: 'skills',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (legacy.docs[0] && !skillIdBySlug.has(slug)) {
      await payload.delete({
        collection: 'skills',
        id: legacy.docs[0].id,
      })
    }
  }

  let upserted = 0

  for (const project of portfolioProjectsSnapshot) {
    const classified = classifyLabels([...project.tech])
    const technologyIds = classified.technologies
      .map((tech) => technologyIdBySlug.get(tech.slug))
      .filter((id): id is number => id !== undefined)

    const skillIds = classified.skills
      .map((skill) => skillIdBySlug.get(skill.slug))
      .filter((id): id is number => id !== undefined)

    if (technologyIds.length === 0) {
      throw new Error(`Project ${project.slug} has no resolvable technologies`)
    }

    const links = project.links ?? {}
    const data = {
      title: project.title,
      slug: project.slug,
      displayOrder: project.id,
      summary: project.summary,
      highlights: project.highlights.map((item) => ({ item })),
      technologies: technologyIds,
      skills: skillIds,
      roles: [...project.roles],
      domains: [...(project.domains ?? [])],
      links: {
        demo: 'demo' in links ? links.demo : undefined,
        repo: 'repo' in links ? links.repo : undefined,
        evidence: 'evidence' in links ? links.evidence : undefined,
      },
      metrics: project.metrics?.map((metric) => ({
        label: metric.label,
        value: metric.value,
      })),
      thumbnail: project.thumbnail,
      featured: Boolean(project.isFeatured),
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

  // Remove the Now-slice placeholder if present.
  const seed = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'seed-project' } },
    limit: 1,
  })
  if (seed.docs[0]) {
    await payload.delete({
      collection: 'projects',
      id: seed.docs[0].id,
    })
  }

  return {
    technologies: technologyIdBySlug.size,
    skills: skillIdBySlug.size,
    projectsUpserted: upserted,
  }
}

const entry = process.argv[1] ?? ''
if (entry.endsWith('seed-projects-from-portfolio.ts')) {
  seedProjectsFromPortfolio()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2))
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

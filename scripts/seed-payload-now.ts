/**
 * One-shot seed for verify: Skill → Project → published Post.
 * Usage: pnpm exec tsx scripts/seed-payload-now.ts
 *
 * Prefer `seed-projects-from-portfolio.ts` for the full Work cutover dataset.
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  const existingSkill = await payload.find({
    collection: 'skills',
    where: { slug: { equals: 'react' } },
    limit: 1,
  })

  const skill =
    existingSkill.docs[0] ??
    (await payload.create({
      collection: 'skills',
      data: {
        name: 'React',
        slug: 'react',
        category: 'Frontend Development',
      },
    }))

  const existingProject = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'seed-project' } },
    limit: 1,
  })

  const projectData = {
    title: 'Seed Project',
    slug: 'seed-project',
    displayOrder: 999,
    summary: 'Seeded project linked to a Skill for verify.',
    highlights: [{ item: 'Related to Skills collection' }],
    tech: [{ item: 'React' }, { item: 'TypeScript' }],
    roles: ['Frontend' as const],
    domains: ['Personal' as const],
    links: {},
    thumbnail: '/placeholder.jpg',
    featured: true,
    skills: [skill.id],
  }

  const project = existingProject.docs[0]
    ? await payload.update({
        collection: 'projects',
        id: existingProject.docs[0].id,
        data: projectData,
      })
    : await payload.create({
        collection: 'projects',
        data: projectData,
      })

  const existingPost = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'hello-payload' } },
    limit: 1,
    draft: true,
  })

  const post =
    existingPost.docs[0] ??
    (await payload.create({
      collection: 'posts',
      data: {
        title: 'Hello Payload',
        slug: 'hello-payload',
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'First published post from the Payload Now slice.',
                    version: 1,
                  },
                ],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        _status: 'published',
      },
    }))

  console.log(
    JSON.stringify(
      {
        skill: { id: skill.id, slug: skill.slug },
        project: { id: project.id, slug: project.slug },
        post: { id: post.id, slug: post.slug, status: post._status },
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

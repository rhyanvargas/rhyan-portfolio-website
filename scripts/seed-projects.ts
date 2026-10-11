/**
 * Seed one featured project from config/portfolio.ts into Payload (Local API).
 * Usage: pnpm seed:projects
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { portfolioConfig } from '../config/portfolio'

async function main() {
  const source = portfolioConfig.projects.items?.[0]
  if (!source) {
    throw new Error('No projects found in portfolioConfig')
  }

  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'projects',
    where: { slug: { equals: source.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    console.log(`Project already exists: ${source.slug} (id=${existing.docs[0].id})`)
    return
  }

  const created = await payload.create({
    collection: 'projects',
    data: {
      title: source.title,
      slug: source.slug,
      summary: source.summary,
      role: source.role,
      stack: (source.tech || []).map((item) => ({ item })),
      featured: Boolean(source.isFeatured),
      agentSummary: `${source.title}: ${source.summary}`,
    },
  })

  console.log(`Seeded project: ${created.slug} (id=${created.id})`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

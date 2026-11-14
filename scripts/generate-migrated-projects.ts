import fs from 'fs'
import path from 'path'
import { portfolioConfig } from '../config/portfolio'
import { migrateProject } from '../lib/project-migration'
import type { DomainCategory } from '../lib/constants'

const domainOverrides: Record<string, DomainCategory[]> = {
  'shadcn-interactive-transcript': ['Education', 'Personal'],
  '8p3p-lms-nextjs': ['Education'],
  'ai-utility-bill-analyzer': ['Productivity', 'Finance'],
  'upload-git-issues': ['Open Source', 'Productivity', 'Enterprise'],
  'rhyglot-ai-translator': ['Productivity'],
  'pomoburn-app': ['Productivity'],
  'ai-generated-captions': ['Productivity', 'Entertainment'],
  'ai-portfolio-generator': ['Personal', 'Open Source'],
  'fluix-ui': ['Open Source', 'Enterprise'],
  'techsaints-website': ['Social', 'Personal'],
  'anana-landing': ['Personal'],
  'simpleverse-metaverse': ['Education', 'Entertainment'],
  '3bears-nft-landing': ['Entertainment', 'Finance'],
}

const migrated = (portfolioConfig.projects.items ?? []).map((project) => {
  const next = migrateProject(project)
  return {
    ...next,
    domains: domainOverrides[project.slug] ?? next.domains,
  }
})

for (const item of migrated) {
  console.log(
    `${item.slug}: roles=${item.roles.join('|')} skills=${item.skillCategories.join('|')} domains=${(item.domains || []).join('|')} tech=${item.tech.join('|')}`
  )
}

const outPath = path.join(process.cwd(), 'scripts', 'migrated-projects.json')
fs.writeFileSync(outPath, JSON.stringify(migrated, null, 2))
console.log(`Wrote ${outPath}`)

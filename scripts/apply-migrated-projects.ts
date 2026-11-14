import fs from 'fs'
import path from 'path'
import type { EnhancedProject } from '../schemas/portfolio'

const portfolioPath = path.join(process.cwd(), 'config', 'portfolio.ts')
const migratedPath = path.join(process.cwd(), 'scripts', 'migrated-projects.json')

const portfolioSource = fs.readFileSync(portfolioPath, 'utf8')
const migrated = JSON.parse(fs.readFileSync(migratedPath, 'utf8')) as EnhancedProject[]

function serializeValue(value: unknown, indent: number): string {
  const pad = '	'.repeat(indent)
  const padInner = '	'.repeat(indent + 1)

  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (value === undefined) {
    return 'undefined'
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    if (value.every((item) => typeof item === 'string')) {
      return `[\n${value.map((item) => `${padInner}${JSON.stringify(item)}`).join(',\n')},\n${pad}]`
    }
    return `[\n${value.map((item) => `${padInner}${serializeValue(item, indent + 1)}`).join(',\n')},\n${pad}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined
    )
    if (entries.length === 0) return '{}'
    return `{\n${entries
      .map(([key, v]) => `${padInner}${key}: ${serializeValue(v, indent + 1)}`)
      .join(',\n')},\n${pad}}`
  }
  return 'null'
}

const projectsLiteral = serializeValue(migrated, 2)

const replaced = portfolioSource.replace(
  /projects:\s*\{\s*items:\s*\[[\s\S]*?\]\s*\},/,
  `projects: {\n\t\titems: ${projectsLiteral},\n\t},`
)

if (replaced === portfolioSource) {
  throw new Error('Failed to locate projects.items block in config/portfolio.ts')
}

const withImport = replaced.includes("from '@/schemas/portfolio'")
  ? replaced
  : replaced

fs.writeFileSync(portfolioPath, withImport)
console.log(`Updated ${portfolioPath} with ${migrated.length} enhanced projects`)

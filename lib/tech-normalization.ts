import { TECHNOLOGIES, type Technology } from '@/lib/constants'

/** Known aliases → canonical TECHNOLOGY names (display + filter). */
export const TECHNOLOGY_ALIASES: Record<string, Technology> = {
  NextJS: 'Next.js',
  'Next.js 15': 'Next.js',
  'Next.js 14': 'Next.js',
  ReactJS: 'React',
  TailwindCSS: 'Tailwind CSS',
  shadcn: 'shadcn/ui',
  'OpenAI API': 'OpenAI',
  'AWS Amplify Gen 2': 'AWS Amplify',
  NodeJS: 'Node.js',
  ExpressJS: 'Express.js',
  'MongoDB Atlas': 'MongoDB',
  PostgresQL: 'PostgreSQL',
  Github: 'GitHub',
  'GitHub API': 'GitHub',
  'Github Actions': 'GitHub Actions',
  CSS3: 'HTML/CSS',
  HTML5: 'HTML/CSS',
  Javascript: 'JavaScript',
  Typescript: 'TypeScript',
}

function uniquePreserveOrder(values: string[]): string[] {
  return values.filter((value, index, array) => array.indexOf(value) === index)
}

/**
 * Resolve a single tech label: apply alias map when present, otherwise keep as-is.
 */
export function resolveTechnologyLabel(tech: string): string {
  return TECHNOLOGY_ALIASES[tech] ?? tech
}

/**
 * Display tech list: alias-normalized, unknowns preserved (Zod, MUX API, etc.).
 */
export function normalizeTechnologiesForDisplay(techArray: string[]): string[] {
  const normalized = uniquePreserveOrder(techArray.map(resolveTechnologyLabel))
  return normalized.length > 0 ? normalized : ['TypeScript']
}

/**
 * Canonical tech list used for filter matching / filter option derivation.
 */
export function getCanonicalTechnologies(techArray: string[]): Technology[] {
  return uniquePreserveOrder(
    techArray
      .map(resolveTechnologyLabel)
      .filter((tech): tech is Technology =>
        (TECHNOLOGIES as readonly string[]).includes(tech)
      )
  ) as Technology[]
}

/**
 * Whether a project's tech stack matches a selected filter technology.
 */
export function projectHasTechnology(projectTech: string[], selectedTech: string): boolean {
  if (projectTech.includes(selectedTech)) return true

  const canonicalSelected = resolveTechnologyLabel(selectedTech)
  const canonicalProject = getCanonicalTechnologies(projectTech)

  return canonicalProject.includes(canonicalSelected as Technology)
}

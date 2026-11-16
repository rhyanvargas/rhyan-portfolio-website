import { getPayloadClient } from '@/lib/payload'
import { toEnhancedProject, type PayloadProjectDoc } from '@/lib/projects-public'
import type { EnhancedProject } from '@/schemas/portfolio'

export { toEnhancedProject, type PayloadProjectDoc } from '@/lib/projects-public'

export async function getPublicProjects(): Promise<EnhancedProject[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 100,
    sort: 'displayOrder',
    overrideAccess: false,
  })

  return result.docs
    .map((doc) => toEnhancedProject(doc as PayloadProjectDoc))
    .filter((project): project is EnhancedProject => project !== null)
}

export async function getPublicProjectBySlug(
  slug: string,
): Promise<EnhancedProject | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
    overrideAccess: false,
  })

  const doc = result.docs[0]
  if (!doc) return null
  return toEnhancedProject(doc as PayloadProjectDoc)
}

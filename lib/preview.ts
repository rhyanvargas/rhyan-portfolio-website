export type PreviewCollection = 'posts' | 'projects'

export function isAllowedPreviewPath(path: string | null | undefined): boolean {
  if (!path || typeof path !== 'string') return false
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false
  if (path.includes('://')) return false
  return true
}

export function previewSecretMatches(
  provided: string | null | undefined,
  expected: string | null | undefined,
): boolean {
  if (!provided || !expected) return false
  if (provided.length !== expected.length) return false

  let mismatch = 0
  for (let i = 0; i < provided.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export function buildPreviewRedirectPath(
  collection: string,
  slug: string,
): string | null {
  if (!slug || slug.includes('/') || slug.includes('..') || slug.includes('\\')) {
    return null
  }

  switch (collection) {
    case 'posts':
      return `/posts/${slug}`
    case 'projects':
      return `/projects/${slug}`
    default:
      return null
  }
}

export function getServerURL(): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
}

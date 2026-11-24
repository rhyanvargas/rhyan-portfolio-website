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
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL
  const vercelEnv = process.env.VERCEL_ENV ?? null
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null

  // Preview deployments must use the current deployment host. A static
  // NEXT_PUBLIC_SERVER_URL (e.g. git-dev alias) makes live-preview iframes
  // cross-host, which Vercel Authentication cannot load inside an iframe.
  if (vercelEnv === 'preview' && vercelUrl) {
    return vercelUrl
  }
  if (fromEnv) {
    return fromEnv
  }
  if (vercelUrl) {
    return vercelUrl
  }
  return 'http://localhost:3000'
}

/**
 * Payload cookie auth rejects PATCH/POST when `Origin` is not on `csrf`.
 * Payload always adds `serverURL`; also allow the www/apex twin so
 * https://www.rhyan.dev/admin works when NEXT_PUBLIC_SERVER_URL is https://rhyan.dev
 * (and the reverse). Without this, saves look like collection access Forbidden.
 */
export function getCsrfOrigins(serverURL: string): string[] {
  const origins = new Set<string>()
  if (!serverURL) return []

  origins.add(serverURL)

  try {
    const url = new URL(serverURL)
    const { hostname, port, protocol } = url

    if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
      return [...origins]
    }

    // Preview / ephemeral hosts are not www-paired.
    if (hostname.endsWith('.vercel.app')) {
      return [...origins]
    }

    const portSuffix = port ? `:${port}` : ''
    if (hostname.startsWith('www.')) {
      origins.add(`${protocol}//${hostname.slice(4)}${portSuffix}`)
    } else if (hostname.includes('.')) {
      origins.add(`${protocol}//www.${hostname}${portSuffix}`)
    }
  } catch {
    // Invalid URL — keep whatever we already added.
  }

  return [...origins]
}

/** Path-only live preview URL so the admin iframe stays same-origin. */
export function buildLivePreviewPath(
  collection: PreviewCollection,
  slug: string,
): string | null {
  return buildPreviewRedirectPath(collection, slug)
}

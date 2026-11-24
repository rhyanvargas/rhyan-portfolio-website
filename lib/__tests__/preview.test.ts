import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  buildLivePreviewPath,
  buildPreviewRedirectPath,
  getCsrfOrigins,
  getServerURL,
  isAllowedPreviewPath,
  previewSecretMatches,
} from '@/lib/preview'

describe('preview helpers (T8 live preview)', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.unstubAllEnvs()
  })

  it('accepts only relative paths that stay on-site', () => {
    expect(isAllowedPreviewPath('/posts/hello')).toBe(true)
    expect(isAllowedPreviewPath('/projects/seed-project')).toBe(true)
    expect(isAllowedPreviewPath('/')).toBe(true)
    expect(isAllowedPreviewPath('https://evil.example/posts')).toBe(false)
    expect(isAllowedPreviewPath('//evil.example')).toBe(false)
    expect(isAllowedPreviewPath('')).toBe(false)
  })

  it('compares preview secrets with a constant-time friendly equality', () => {
    expect(previewSecretMatches('abc', 'abc')).toBe(true)
    expect(previewSecretMatches('abc', 'abd')).toBe(false)
    expect(previewSecretMatches('', 'abc')).toBe(false)
    expect(previewSecretMatches('abc', '')).toBe(false)
  })

  it('builds a safe redirect path from collection + slug', () => {
    expect(buildPreviewRedirectPath('posts', 'hello')).toBe('/posts/hello')
    expect(buildPreviewRedirectPath('projects', 'seed-project')).toBe(
      '/projects/seed-project',
    )
    expect(buildPreviewRedirectPath('posts', '../admin')).toBeNull()
    expect(buildPreviewRedirectPath('users', '1')).toBeNull()
  })

  it('builds relative live-preview paths for same-origin iframes', () => {
    expect(buildLivePreviewPath('projects', '8p3p-lms-nextjs')).toBe(
      '/projects/8p3p-lms-nextjs',
    )
    expect(buildLivePreviewPath('posts', 'hello')).toBe('/posts/hello')
  })

  it('prefers the current Vercel preview deployment over NEXT_PUBLIC_SERVER_URL', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    vi.stubEnv('VERCEL_URL', 'app-abc123.vercel.app')
    vi.stubEnv(
      'NEXT_PUBLIC_SERVER_URL',
      'https://v0-rhyan-s-portfolio-website-git-dev-rhyanvargas1s-projects.vercel.app',
    )

    expect(getServerURL()).toBe('https://app-abc123.vercel.app')
  })

  it('keeps NEXT_PUBLIC_SERVER_URL for production', () => {
    vi.stubEnv('VERCEL_ENV', 'production')
    vi.stubEnv('VERCEL_URL', 'app-abc123.vercel.app')
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://rhyan.dev')

    expect(getServerURL()).toBe('https://rhyan.dev')
  })

  it('includes www and apex hosts in CSRF origins for cookie auth', () => {
    expect(getCsrfOrigins('https://rhyan.dev').sort()).toEqual([
      'https://rhyan.dev',
      'https://www.rhyan.dev',
    ])
    expect(getCsrfOrigins('https://www.rhyan.dev').sort()).toEqual([
      'https://rhyan.dev',
      'https://www.rhyan.dev',
    ])
    expect(getCsrfOrigins('http://localhost:3000')).toEqual([
      'http://localhost:3000',
    ])
    expect(getCsrfOrigins('https://app-abc123.vercel.app')).toEqual([
      'https://app-abc123.vercel.app',
    ])
  })
})

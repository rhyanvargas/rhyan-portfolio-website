import { describe, expect, it } from 'vitest'

import {
  buildPreviewRedirectPath,
  isAllowedPreviewPath,
  previewSecretMatches,
} from '@/lib/preview'

describe('preview helpers (T8 live preview)', () => {
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
})

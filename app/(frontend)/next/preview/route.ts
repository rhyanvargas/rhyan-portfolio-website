import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import {
  isAllowedPreviewPath,
  previewSecretMatches,
} from '@/lib/preview'

export async function GET(request: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(request.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!previewSecretMatches(previewSecret, process.env.PREVIEW_SECRET)) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!isAllowedPreviewPath(path)) {
    return new Response('Invalid preview path', { status: 400 })
  }

  let user = null
  try {
    const authResult = await payload.auth({
      headers: request.headers,
    })
    user = authResult.user
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()
  redirect(path!)
}

'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

import { getServerURL } from '@/lib/preview'

export function RefreshRouteOnSave() {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={getServerURL()}
    />
  )
}

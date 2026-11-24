'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getServerURL } from '@/lib/preview'

export function RefreshRouteOnSave() {
  const router = useRouter()
  const fallbackServerURL = getServerURL()
  const [serverURL, setServerURL] = useState(fallbackServerURL)

  useEffect(() => {
    // Prefer the browser origin so the live-preview client matches the iframe host.
    setServerURL(window.location.origin)
  }, [])

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  )
}

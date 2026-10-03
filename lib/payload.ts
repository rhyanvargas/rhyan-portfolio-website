import { getPayload } from 'payload'
import config from '@payload-config'

/** Shared Local API helper for Server Components / route handlers. */
export async function getPayloadClient() {
  return getPayload({ config })
}

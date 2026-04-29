/**
 * This route renders the embedded Sanity Studio.
 * Keep it a client component — Studio needs the browser.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

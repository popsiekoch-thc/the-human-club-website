/**
 * Auto-syncs the "T.H.C Radio Shows" section with a YouTube playlist:
 *   https://www.youtube.com/playlist?list=PLI9uodLFtg0A
 *
 * Uses YouTube's public playlist RSS feed — no API key needed, no
 * quota, no OAuth. Server-fetched with Next's revalidate so new
 * uploads appear on the site within the cache window without any
 * deploy or edit.
 *
 * Mirrors the shape of lib/radio.ts so the YouTubePlayer component
 * can share a near-identical UX with RadioPlayer.
 */

export interface YouTubeVideo {
  /** YouTube video id (e.g. `e41JgyBPQio`) — used for embed URL. */
  id:          string
  /** Display title straight from the feed. */
  title:       string
  /** Full watch URL (used by the "Open on YouTube" link). */
  watchUrl:    string
  /** High-quality thumbnail URL from the feed. */
  thumbnail:   string
  /** ISO date string, newest first in the feed. */
  publishedAt: string
  /** Two-digit episode number — pulled from "Episode #N" in the title
   *  if present, else the position in the feed. */
  showNum:     string
}

/* -------- constants ------------------------------------------------ */

const PLAYLIST_ID = 'PLI9uodLFtg0A'
const RSS_URL     = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`
const CHANNEL_URL  = 'https://www.youtube.com/@TheHumanClub_Podcast'

/** Fallback used if YouTube RSS is unreachable. Keep two in sync with
 *  the current playlist head so the page never renders empty. */
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'e41JgyBPQio',
    title: 'LA BARCA Boat Invites T.H.C Radio Episode #2',
    watchUrl: 'https://www.youtube.com/watch?v=e41JgyBPQio',
    thumbnail: 'https://i2.ytimg.com/vi/e41JgyBPQio/hqdefault.jpg',
    publishedAt: '2026-10-04T09:00:22+00:00',
    showNum: '02',
  },
]

/* -------- public entry point --------------------------------------- */

export async function getLatestYouTubeShows(limit = 3): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(RSS_URL, {
      // Match the radio feed cadence: 5-minute server-side revalidation
      // so a new YouTube upload lands on the page within ≤5 min.
      next: { revalidate: 300, tags: ['youtube'] },
      headers: {
        'User-Agent': 'Mozilla/5.0 (The Human Club — youtube auto-sync)',
      },
    })
    if (!res.ok) return FALLBACK_VIDEOS.slice(0, limit)
    const xml = await res.text()
    const parsed = parseFeed(xml, limit)
    return parsed.length > 0 ? parsed : FALLBACK_VIDEOS.slice(0, limit)
  } catch {
    return FALLBACK_VIDEOS.slice(0, limit)
  }
}

/* -------- Atom feed parser (regex-only, no lib) -------------------- */

function parseFeed(xml: string, limit: number): YouTubeVideo[] {
  const items: YouTubeVideo[] = []
  const entryBlocks = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)

  let i = 0
  for (const m of entryBlocks) {
    if (i >= limit) break
    const body = m[1]

    const videoId     = extract(body, /<yt:videoId>([\s\S]*?)<\/yt:videoId>/)
    const rawTitle    = extract(body, /<title>([\s\S]*?)<\/title>/)
    const published   = extract(body, /<published>([\s\S]*?)<\/published>/)
    const watchHref   = extract(body, /<link\s+rel="alternate"\s+href="([^"]+)"/)
    const thumbnail   = extract(body, /<media:thumbnail\s+url="([^"]+)"/)

    if (!videoId) continue

    // "LA BARCA Boat Invites T.H.C Radio Episode #2"
    //                                            ↑ show number
    const numMatch = rawTitle.match(/#\s*0*(\d+)/)
    const showNum  = (numMatch?.[1] ?? String(i + 1)).padStart(2, '0')

    items.push({
      id:          videoId,
      title:       decodeEntities(rawTitle.trim()),
      watchUrl:    watchHref || `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail:   thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: published,
      showNum,
    })
    i++
  }
  return items
}

function extract(text: string, regex: RegExp): string {
  const m = text.match(regex)
  return m ? m[1] : ''
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&apos;/g, "'")
}

export { PLAYLIST_URL, CHANNEL_URL, PLAYLIST_ID }

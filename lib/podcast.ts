import { client } from './sanity'

export interface Episode {
  guid:        string
  title:       string
  episodeNum:  string
  artworkUrl:  string
  appleUrl:    string
  durationStr: string
  /** Adam Munnings / Ep 03 by default — overridable from Sanity */
  featured:    boolean
}

const APPLE_ID  = '1887355489'
const FEED_URL  = `https://itunes.apple.com/lookup?id=${APPLE_ID}&media=podcast&entity=podcastEpisode&limit=5`

/** Fallback featured trackId — Adam Munnings / Ep 03 — used if Sanity has no entries. */
const DEFAULT_FEATURED_TRACK_IDS = ['1000758809096']

type Override = { trackId: string; featured: boolean; title?: string }

const OVERRIDE_QUERY = `*[_type == "podcastEpisode"]{ trackId, featured, title }`

async function getOverrides(): Promise<Map<string, Override>> {
  const map = new Map<string, Override>()
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return map
  try {
    const docs = await client.fetch<Override[]>(OVERRIDE_QUERY, {}, {
      next: { revalidate: 1800, tags: ['podcast'] },
    })
    for (const o of docs ?? []) {
      if (o?.trackId) map.set(String(o.trackId), o)
    }
  } catch {
    /* swallow; fall through to defaults */
  }
  return map
}

export async function getLatestEpisodes(): Promise<Episode[]> {
  const [overrides, feedRes] = await Promise.allSettled([
    getOverrides(),
    fetch(FEED_URL, { next: { revalidate: 1800, tags: ['podcast'] } }),
  ])

  const overrideMap = overrides.status === 'fulfilled' ? overrides.value : new Map<string, Override>()
  const hasSanityFeatured = Array.from(overrideMap.values()).some(o => o.featured)

  const isFeatured = (trackId: string) =>
    hasSanityFeatured
      ? !!overrideMap.get(trackId)?.featured
      : DEFAULT_FEATURED_TRACK_IDS.includes(trackId)

  if (feedRes.status === 'rejected' || !feedRes.value.ok) {
    return fallbackEpisodes(isFeatured, overrideMap)
  }

  try {
    const data = await feedRes.value.json()
    const episodes = (data.results as Record<string, unknown>[])
      .filter((r) => r.wrapperType === 'podcastEpisode')
      .slice(0, 4)

    return episodes.map((ep, i) => {
      const trackId = String(ep.trackId)
      const override = overrideMap.get(trackId)
      return {
        guid:        trackId,
        title:       override?.title || String(ep.trackName),
        episodeNum:  String(ep.trackNumber ?? i + 1).padStart(2, '0'),
        artworkUrl:  String(ep.artworkUrl160 ?? ep.artworkUrl60 ?? ''),
        appleUrl:    String(ep.trackViewUrl ?? ''),
        durationStr: formatMs(Number(ep.trackTimeMillis ?? 0)),
        featured:    isFeatured(trackId),
      }
    })
  } catch {
    return fallbackEpisodes(isFeatured, overrideMap)
  }
}

function formatMs(ms: number): string {
  if (!ms) return '— min'
  const m = Math.floor(ms / 60000)
  return `${m} min`
}

function fallbackEpisodes(
  isFeatured: (trackId: string) => boolean,
  overrideMap: Map<string, Override>,
): Episode[] {
  const eps: Array<Omit<Episode, 'featured'>> = [
    { guid: '1000756839720', title: 'The Human Club X Lisa',         episodeNum: '01', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000756839720', durationStr: '—' },
    { guid: '1000758015710', title: 'The Human Club X Phoenix',      episodeNum: '02', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758015710', durationStr: '—' },
    { guid: '1000758809096', title: 'The Human Club X Adam Munnings',episodeNum: '03', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758809096', durationStr: '—' },
    { guid: '1000762255675', title: 'The Human Club X Stevie',       episodeNum: '04', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000762255675', durationStr: '—' },
  ]
  return eps.map(e => ({
    ...e,
    title: overrideMap.get(e.guid)?.title || e.title,
    featured: isFeatured(e.guid),
  }))
}

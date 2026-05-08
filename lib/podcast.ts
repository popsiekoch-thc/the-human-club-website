import { client } from './sanity'

export interface Episode {
  guid:        string
  title:       string
  episodeNum:  string
  artworkUrl:  string
  appleUrl:    string
  durationStr: string
  /** Inline Podbean player URL — when present, the row renders the iframe. */
  podbeanSrc?: string
  /** Featured row treatment — overridable from Sanity */
  featured:    boolean
}

const APPLE_ID  = '1887355489'
const FEED_URL  = `https://itunes.apple.com/lookup?id=${APPLE_ID}&media=podcast&entity=podcastEpisode&limit=10`

/**
 * Canonical episode metadata, keyed by Apple iTunes trackId.
 *
 * Each entry overrides the iTunes-fetched title and episode number, and
 * provides the Podbean player URL that gets embedded in the row.
 *
 * To add a new episode:
 *   1. Add a new entry below with its trackId, episodeNum, title and
 *      podbeanSrc (the `?i=…` URL from the Podbean embed).
 *   2. iTunes will already include the episode in the feed automatically;
 *      this map just attaches the inline player + canonical metadata.
 *
 * If iTunes returns an episode whose trackId is NOT in this map, it still
 * renders (with iTunes' title and a numeric fallback) but without an
 * embedded player.
 */
export const PODBEAN_MAP: Record<string, { episodeNum: string; title: string; podbeanSrc: string }> = {
  // Ep 01 — Lisa Thaens
  '1000756839720': {
    episodeNum: '01',
    title: 'The Human Club X Lisa Thaens',
    podbeanSrc: 'https://www.podbean.com/player-v2/?i=pb-rm955-1a7a1db&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7',
  },
  // Ep 02 — Adam Munnings
  '1000758809096': {
    episodeNum: '02',
    title: 'The Human Club X Adam Munnings',
    podbeanSrc: 'https://www.podbean.com/player-v2/?i=kdmjj-1a8b27c&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7',
  },
  // Ep 03 — Phoenix
  '1000758015710': {
    episodeNum: '03',
    title: 'The Human Club X Phoenix',
    podbeanSrc: 'https://www.podbean.com/player-v2/?i=8q7nr-1a84c2c&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7',
  },
  // Ep 04 — Stevie
  '1000762255675': {
    episodeNum: '04',
    title: 'The Human Club X Stevie',
    podbeanSrc: 'https://www.podbean.com/player-v2/?i=heyv8-1aa1265&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&btn-skin=7',
  },
}

/** No default featured episode — every row renders uniformly. Editors can
 *  still flag a featured episode in Sanity (podcastEpisode.featured). */
const DEFAULT_FEATURED_TRACK_IDS: string[] = []

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

function applyMap(
  base: Omit<Episode, 'featured' | 'podbeanSrc'>,
  isFeatured: (trackId: string) => boolean,
  overrideMap: Map<string, Override>,
): Episode {
  const trackId = base.guid
  const podbean = PODBEAN_MAP[trackId]
  const override = overrideMap.get(trackId)
  return {
    ...base,
    title:      override?.title || podbean?.title || base.title,
    episodeNum: podbean?.episodeNum || base.episodeNum,
    podbeanSrc: podbean?.podbeanSrc,
    featured:   isFeatured(trackId),
  }
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

    return episodes.map((ep, i) => {
      const trackId = String(ep.trackId)
      return applyMap(
        {
          guid:        trackId,
          title:       String(ep.trackName),
          episodeNum:  String(ep.trackNumber ?? i + 1).padStart(2, '0'),
          artworkUrl:  String(ep.artworkUrl160 ?? ep.artworkUrl60 ?? ''),
          appleUrl:    String(ep.trackViewUrl ?? ''),
          durationStr: formatMs(Number(ep.trackTimeMillis ?? 0)),
        },
        isFeatured,
        overrideMap,
      )
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
  const eps: Array<Omit<Episode, 'featured' | 'podbeanSrc'>> = [
    { guid: '1000756839720', title: 'The Human Club X Lisa Thaens',  episodeNum: '01', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000756839720', durationStr: '—' },
    { guid: '1000758809096', title: 'The Human Club X Adam Munnings', episodeNum: '02', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758809096', durationStr: '—' },
    { guid: '1000758015710', title: 'The Human Club X Phoenix',      episodeNum: '03', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758015710', durationStr: '—' },
    { guid: '1000762255675', title: 'The Human Club X Stevie',       episodeNum: '04', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000762255675', durationStr: '—' },
  ]
  return eps.map(e => applyMap(e, isFeatured, overrideMap))
}

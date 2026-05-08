import { client } from './sanity'

export interface Episode {
  guid:        string
  title:       string
  episodeNum:  string
  artworkUrl:  string
  appleUrl:    string
  durationStr: string
  /** Direct MP3 URL (Podbean-hosted) used by the inline custom audio player. */
  audioUrl?:   string
  /** Featured row treatment — overridable from Sanity */
  featured:    boolean
}

const APPLE_ID  = '1887355489'
const FEED_URL  = `https://itunes.apple.com/lookup?id=${APPLE_ID}&media=podcast&entity=podcastEpisode&limit=10`

/**
 * Per-episode metadata override, keyed by Apple iTunes trackId.
 *
 * iTunes auto-fills title, episodeUrl (the MP3) and trackViewUrl. This map
 * just overrides the displayed episode number + canonical title where the
 * iTunes title differs from how we want it on the site.
 *
 * To rename or renumber a new episode just add a new entry here. iTunes
 * already auto-includes new episodes via the feed; the custom HTML5 player
 * uses iTunes' episodeUrl directly, so no Podbean iframe needed.
 */
export const EPISODE_OVERRIDES: Record<string, { episodeNum: string; title: string }> = {
  // Ep 01 — Lisa Thaens
  '1000756839720': { episodeNum: '01', title: 'The Human Club X Lisa Thaens' },
  // Ep 02 — Adam Munnings
  '1000758809096': { episodeNum: '02', title: 'The Human Club X Adam Munnings' },
  // Ep 03 — Phoenix
  '1000758015710': { episodeNum: '03', title: 'The Human Club X Phoenix' },
  // Ep 04 — Stevie
  '1000762255675': { episodeNum: '04', title: 'The Human Club X Stevie' },
}

/** No default featured episode — every row renders uniformly. */
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

function applyOverrides(
  base: Omit<Episode, 'featured'>,
  isFeatured: (trackId: string) => boolean,
  overrideMap: Map<string, Override>,
): Episode {
  const trackId = base.guid
  const local = EPISODE_OVERRIDES[trackId]
  const sanity = overrideMap.get(trackId)
  return {
    ...base,
    title:      sanity?.title || local?.title || base.title,
    episodeNum: local?.episodeNum || base.episodeNum,
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
      const audioUrl = String(ep.episodeUrl ?? ep.previewUrl ?? '')
      return applyOverrides(
        {
          guid:        trackId,
          title:       String(ep.trackName),
          episodeNum:  String(ep.trackNumber ?? i + 1).padStart(2, '0'),
          artworkUrl:  String(ep.artworkUrl160 ?? ep.artworkUrl60 ?? ''),
          appleUrl:    String(ep.trackViewUrl ?? ''),
          durationStr: formatMs(Number(ep.trackTimeMillis ?? 0)),
          audioUrl:    audioUrl || undefined,
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
  const eps: Array<Omit<Episode, 'featured'>> = [
    { guid: '1000756839720', title: 'The Human Club X Lisa Thaens',  episodeNum: '01', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000756839720', durationStr: '—' },
    { guid: '1000758809096', title: 'The Human Club X Adam Munnings', episodeNum: '02', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758809096', durationStr: '—' },
    { guid: '1000758015710', title: 'The Human Club X Phoenix',      episodeNum: '03', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758015710', durationStr: '—' },
    { guid: '1000762255675', title: 'The Human Club X Stevie',       episodeNum: '04', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000762255675', durationStr: '—' },
  ]
  return eps.map(e => applyOverrides(e, isFeatured, overrideMap))
}

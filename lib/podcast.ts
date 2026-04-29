export interface Episode {
  guid:        string
  title:       string
  episodeNum:  string
  artworkUrl:  string
  appleUrl:    string
  durationStr: string
}

const APPLE_ID  = '1887355489'
const FEED_URL  = `https://itunes.apple.com/lookup?id=${APPLE_ID}&media=podcast&entity=podcastEpisode&limit=5`

export async function getLatestEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 1800, tags: ['podcast'] },
    })
    if (!res.ok) return fallbackEpisodes()
    const data = await res.json()
    const episodes = (data.results as Record<string, unknown>[])
      .filter((r) => r.wrapperType === 'podcastEpisode')
      .slice(0, 4)

    return episodes.map((ep, i) => ({
      guid:        String(ep.trackId),
      title:       String(ep.trackName),
      episodeNum:  String(ep.trackNumber ?? i + 1).padStart(2, '0'),
      artworkUrl:  String(ep.artworkUrl160 ?? ep.artworkUrl60 ?? ''),
      appleUrl:    String(ep.trackViewUrl ?? ''),
      durationStr: formatMs(Number(ep.trackTimeMillis ?? 0)),
    }))
  } catch {
    return fallbackEpisodes()
  }
}

function formatMs(ms: number): string {
  if (!ms) return '— min'
  const m = Math.floor(ms / 60000)
  return `${m} min`
}

function fallbackEpisodes(): Episode[] {
  return [
    { guid: '1', title: 'The Human Club X Lisa',         episodeNum: '01', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000756839720', durationStr: '—' },
    { guid: '2', title: 'The Human Club X Phoenix',      episodeNum: '02', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758015710', durationStr: '—' },
    { guid: '3', title: 'The Human Club X Adam Munnings',episodeNum: '03', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000758809096', durationStr: '—' },
    { guid: '4', title: 'The Human Club X Stevie',       episodeNum: '04', artworkUrl: '', appleUrl: 'https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489?i=1000762255675', durationStr: '—' },
  ]
}

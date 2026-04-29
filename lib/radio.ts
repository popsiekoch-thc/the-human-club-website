export interface Mix {
  id:       string
  title:    string
  artist:   string
  duration: string
  url:      string
  mixNum:   string
}

const SC_HANDLE = 'thehumanclubradio'
const SC_URL    = `https://soundcloud.com/${SC_HANDLE}`

export async function getLatestMixes(): Promise<Mix[]> {
  // SoundCloud's public API requires a client_id that rotates.
  // We fall back to curated static data until a server-side scrape or
  // official API token is available. The SoundCloud link is live.
  return [
    { id: '12', title: 'Cape Town summer',       artist: 'Aaron Zeederberg', duration: '78 min', url: SC_URL, mixNum: '12' },
    { id: '11', title: 'After-hours Kreuzberg',  artist: 'Femdelic',         duration: '62 min', url: SC_URL, mixNum: '11' },
    { id: '10', title: 'Lemonella b2b Thor',      artist: 'Live from Säule', duration: '91 min', url: SC_URL, mixNum: '10' },
  ]
}

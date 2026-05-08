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
  // SoundCloud's public API requires a rotating client_id, so we don't
  // hardcode placeholder mixes. The component falls back to a CTA card
  // pointing at the live SoundCloud profile until a real fetch (or
  // Sanity-managed list) is wired up.
  return []
}

export { SC_URL }

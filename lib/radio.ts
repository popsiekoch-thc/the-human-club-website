/**
 * Auto-syncs the T.H.C Radio page with the SoundCloud profile:
 *   https://soundcloud.com/thehumanclubradio
 *
 * Pulls the public RSS feed on the server (revalidated every 5 minutes
 * so new uploads show up on the site without any deploy or edit).
 * Parses the XML with lightweight regex — no XML library — and returns
 * up to `limit` mixes, newest first.
 *
 * Falls back to a small static set if the RSS fetch fails for any
 * reason (SoundCloud outage, rate-limit, network blip) so the page
 * never renders empty.
 */

export interface Mix {
  /** SoundCloud track id — used to build the embed URL. */
  id:     string
  /** Display title (episode name minus the "/ Radio #NNN" suffix). */
  title:  string
  /** Guest / host — best-effort parse of "invites X". */
  host:   string
  /** Link to the track's public SoundCloud page. */
  scUrl:  string
  /** Accent colour for the SC embed player (hex without leading #). */
  color:  string
  /** Two-digit mix number pulled from "Radio #NNN" in the title. */
  mixNum: string
}

/* -------- constants ------------------------------------------------ */

const SC_HANDLE  = 'thehumanclubradio'
const SC_USER_ID = '1448939372'
const RSS_URL    = `https://feeds.soundcloud.com/users/soundcloud:users:${SC_USER_ID}/sounds.rss`
const SC_URL     = `https://soundcloud.com/${SC_HANDLE}`

/** Rotates through the SoundCloud accent-colour palette used elsewhere
 *  in the design (brand brown → soft olive → brand brown). */
const ACCENT_COLORS = ['673818', '848464', '673818']

/** Never-empty fallback: if SoundCloud is unreachable, we still render
 *  the three mixes that were live at the time of writing. */
const FALLBACK_MIXES: Mix[] = [
  { id: '2364238664', title: 'THC Radio invites Popsie & alle anders', host: 'Popsie & alle anders', scUrl: 'https://soundcloud.com/thehumanclubradio/thc-radio-invites-popsie-alle', color: '673818', mixNum: '03' },
  { id: '2358778865', title: 'T.H.C invites speh.ki. ft zeedez',       host: 'speh.ki. ft zeedez',    scUrl: 'https://soundcloud.com/thehumanclubradio/t-h-c-invites-speh-ki-ft',    color: '848464', mixNum: '02' },
  { id: '2310193364', title: 'T.H.C invites alle anders',              host: 'alle anders',           scUrl: 'https://soundcloud.com/thehumanclubradio/t-h-c-radio-launch-event-alle', color: '673818', mixNum: '01' },
]

/* -------- public entry point --------------------------------------- */

export async function getLatestMixes(limit = 3): Promise<Mix[]> {
  try {
    const res = await fetch(RSS_URL, {
      // Revalidate on the server every 5 minutes. New SoundCloud uploads
      // appear on the page within that window with no redeploy.
      next: { revalidate: 300, tags: ['radio'] },
      headers: {
        'User-Agent': 'Mozilla/5.0 (The Human Club — radio auto-sync)',
      },
    })
    if (!res.ok) return FALLBACK_MIXES.slice(0, limit)
    const xml = await res.text()
    const parsed = parseRss(xml, limit)
    return parsed.length > 0 ? parsed : FALLBACK_MIXES.slice(0, limit)
  } catch {
    return FALLBACK_MIXES.slice(0, limit)
  }
}

/* -------- RSS parser (regex-only, no lib) -------------------------- */

function parseRss(xml: string, limit: number): Mix[] {
  const items: Mix[] = []
  const itemBlocks = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)

  let i = 0
  for (const m of itemBlocks) {
    if (i >= limit) break
    const body = m[1]

    const rawTitle = extract(body, /<title>([\s\S]*?)<\/title>/)
    const link     = extract(body, /<link>([\s\S]*?)<\/link>/)
    const enclUrl  = extract(body, /<enclosure[^>]*\burl="([^"]+)"/)

    // SoundCloud's enclosure URL starts with /stream/<track-id>- — that
    // numeric id is what the embed player URL takes.
    const idMatch = enclUrl.match(/\/stream\/(\d+)-/)
    const id      = idMatch?.[1] ?? ''
    if (!id) continue

    // "T.H.C invites speh.ki. ft zeedez / Radio #002"
    //                                  ↑ mix number
    const numMatch = rawTitle.match(/#\s*0*(\d+)/)
    const mixNum   = (numMatch?.[1] ?? String(i + 1)).padStart(2, '0')

    // "T.H.C invites <host> / Radio #NNN"
    const hostMatch = rawTitle.match(/invites?\s+([\s\S]+?)(?:\s*\/\s*Radio|$)/i)
    const host      = hostMatch ? decodeEntities(hostMatch[1].trim()) : 'T.H.C Radio'

    // Clean display title: strip trailing "/ Radio #NNN" if present.
    const displayTitle = decodeEntities(
      rawTitle.replace(/\s*\/\s*Radio\s*#\s*\d+\s*$/i, '').trim(),
    )

    items.push({
      id,
      title:  displayTitle,
      host,
      scUrl:  link.trim() || SC_URL,
      color:  ACCENT_COLORS[i % ACCENT_COLORS.length],
      mixNum,
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
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g,  '<')
    .replace(/&gt;/g,  '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&apos;/g, "'")
}

export { SC_URL, RSS_URL }

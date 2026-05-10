import { client, urlFor } from './sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type Artist = {
  name:        string
  bio?:        string
  soundcloud:  string
  /** Pre-resolved square 800×800 CDN URL — empty string when no Sanity photo. */
  photoUrl:    string
  /** First-letter fallback for cards without a photo. */
  initial:     string
  /** "01" / "02" / ... — display order on the page. */
  num:         string
}

/* ------- Sanity-driven fetch ------------------------------------------ */

type RawArtist = {
  name?:       string
  bio?:        string
  soundcloud?: string
  photo?:      SanityImageSource
}

const QUERY = `*[_type == "artist"] | order(order asc, _createdAt asc) {
  name,
  bio,
  soundcloud,
  photo
}`

const FALLBACK: Artist[] = [
  { name: 'Lemonella',        bio: 'Write-up to still be added.', soundcloud: 'https://soundcloud.com/lemonella',  photoUrl: '', initial: 'L', num: '01' },
  { name: 'Femdelic',         bio: 'Write-up to still be added.', soundcloud: 'https://soundcloud.com/femdelic',   photoUrl: '', initial: 'F', num: '02' },
  { name: 'Aaron Zeederberg', bio: 'Write-up to still be added.', soundcloud: 'https://soundcloud.com/aaronzeedez', photoUrl: '', initial: 'A', num: '03' },
]

export async function getArtists(): Promise<Artist[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK
  try {
    const docs = await client.fetch<RawArtist[]>(QUERY, {}, {
      next: { revalidate: 60, tags: ['artist'] },
    })
    if (!docs || docs.length === 0) return FALLBACK

    return docs.map((d, i) => {
      const name = (d.name ?? '').trim()
      const initial = (name[0] ?? '?').toUpperCase()
      // Resolve the Sanity image asset to a square 800×800 CDN URL — equivalent
      // to an Instagram-feed-post crop. The hotspot set in Sanity drives the
      // crop region.
      const photoUrl = d.photo
        ? urlFor(d.photo)
            .width(800)
            .height(800)
            .fit('crop')
            .auto('format')
            .url()
        : ''
      return {
        name,
        bio:        d.bio?.trim() || undefined,
        soundcloud: d.soundcloud?.trim() || '#',
        photoUrl,
        initial,
        num:        (i + 1).toString().padStart(2, '0'),
      }
    })
  } catch {
    return FALLBACK
  }
}

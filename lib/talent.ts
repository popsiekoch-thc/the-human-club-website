import { client } from './sanity'

export type Talent = {
  name: string
  shortName: string
  initial: string
  handle: string
  role: string
  bio: string
  ig: string
  link: string
  linkLabel: string
  muxPlaybackId?: string
  /** override frame aspect ratio for landscape/square reels */
  reelRatio?: string
}

const FALLBACK: Talent[] = [
  {
    initial: 'A', name: 'Alex Kibb', handle: '@alexkibb', shortName: 'Alex',
    role: '— Photographer · Videographer',
    bio: 'A photographer and videographer who specialises in fashion, outdoor / adventure and product content. Equally comfortable shooting stills or motion — takes a campaign from concept to delivery, ready for social and brand campaigns.',
    ig: 'https://www.instagram.com/alexkibb/',
    link: 'https://alexkibb.com/', linkLabel: 'Website',
  },
  {
    initial: 'J', name: "Jamila O'Donnell", handle: '@jamilaodonnell_', shortName: 'Jamila',
    role: '— Experience Designer · Chef · Lifestyle Model',
    bio: 'South African-born, Berlin-based model, lifestyle creator and chef — and the founder of Studio Jamila. Fashion, food and lifestyle content that feels genuinely lived-in. The right partner for brands looking for influence with real substance behind it.',
    ig: 'https://www.instagram.com/jamilaodonnell_/',
    link: 'https://www.tiktok.com/@jamilaodonnell_', linkLabel: 'TikTok',
  },
  {
    initial: 'M', name: 'Moise', handle: '@moiseymb', shortName: 'Moise',
    role: '— Director · Photographer',
    bio: 'A director and photographer with a strong focus on fashion editorial, portraiture and narrative-driven imagery. Brings full creative direction to every project — the go-to for brands that need a single creative to own the look and feel of a campaign from start to finish.',
    ig: 'https://www.instagram.com/moiseymb/',
    link: 'https://www.tiktok.com/@moiseymb', linkLabel: 'TikTok',
  },
  {
    initial: 'T', name: 'Thor Rixon', handle: '@thorrixon', shortName: 'Thor',
    role: '— Sound Designer · Videographer',
    bio: 'Videographer and sound designer creating content rooted in music, performance and live culture. The unique ability to handle both the visual and audio sides makes him a powerful choice for brands wanting immersive, music-led campaigns or event content that feels as good as it looks.',
    ig: 'https://www.instagram.com/thorrixon/',
    link: 'https://www.tiktok.com/@thorrixon', linkLabel: 'TikTok',
  },
  {
    initial: 'V', name: 'Victoria Cliffe', handle: '@victoria.cliffe', shortName: 'Victoria',
    role: '— Director · Videographer · Editor',
    bio: 'Director, videographer and editor specialising in fashion film, editorial content and brand storytelling. Handles the full pipeline — directing, shooting and editing — turning around polished, platform-ready video content efficiently for Reels, TikTok or YouTube.',
    ig: 'https://www.instagram.com/victoriacliffe.films/',
    link: 'https://www.tiktok.com/@victoria.cliffe', linkLabel: 'TikTok',
  },
  {
    initial: 'W', name: 'WezLew', handle: '@wezlew', shortName: 'Wez',
    role: '— Creative Director · Analog Photographer · AI',
    bio: 'Cape Town–based creative director and analog photographer travelling the world and shooting the light through his eyes. Wez is also highly advanced when it comes to AI creation and directing brand partnerships outside of his swimwear niche.',
    ig: 'https://www.instagram.com/wezlew/',
    link: 'https://www.wezlew.com/', linkLabel: 'Website',
  },
]

const QUERY = `*[_type == "talent"] | order(order asc) {
  name,
  handle,
  role,
  bio,
  "ig": igUrl,
  "link": linkUrl,
  "linkLabel": linkLabel,
  "muxPlaybackId": muxReel.playbackId,
  reelRatio
}`

export async function getTalents(): Promise<Talent[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK
  try {
    const docs = await client.fetch<Array<Partial<Talent>>>(QUERY, {}, {
      next: { revalidate: 60, tags: ['talent'] },
    })
    if (!docs || docs.length === 0) return FALLBACK
    return docs.map((d) => {
      const name = d.name ?? ''
      const shortName = name.split(' ')[0] ?? name
      const initial = (name[0] ?? '?').toUpperCase()
      return {
        name,
        shortName,
        initial,
        handle: d.handle ?? '',
        role: d.role ?? '',
        bio: d.bio ?? '',
        ig: d.ig ?? '#',
        link: d.link ?? '#',
        linkLabel: d.linkLabel ?? 'Link',
        muxPlaybackId: d.muxPlaybackId || undefined,
        reelRatio:     d.reelRatio || undefined,
      }
    })
  } catch {
    return FALLBACK
  }
}

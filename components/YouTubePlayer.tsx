'use client'

import { useState } from 'react'
import type { YouTubeVideo } from '@/lib/youtube'

const CHANNEL_URL  = 'https://www.youtube.com/@TheHumanClub_Podcast'

/** Build the YouTube embed URL. Autoplay only after the user has
 *  interacted (click on a card) so first paint doesn't blast audio. */
function buildEmbed(video: YouTubeVideo, autoplay: boolean): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    ...(autoplay ? { autoplay: '1' } : {}),
  })
  return `https://www.youtube.com/embed/${video.id}?${params.toString()}`
}

type Props = {
  /** Server-fetched from the YouTube playlist RSS feed and passed in
   *  from YouTubeShows.tsx. Newest first. */
  videos: YouTubeVideo[]
}

export default function YouTubePlayer({ videos }: Props) {
  const [selected, setSelected] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Safety: feed empty or errored → CTA to the full channel, no crash.
  if (videos.length === 0) {
    return (
      <div style={{ marginTop: 24, padding: '32px 22px', border: '1px solid rgba(225,225,213,0.18)', color: 'var(--shell)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.015em' }}>
          Watch the full show on YouTube
        </div>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 14,
            fontFamily: 'var(--font-ui)', fontWeight: 700,
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            borderBottom: '1px solid currentColor', color: 'var(--shell)',
          }}
        >
          YouTube ↗
        </a>
      </div>
    )
  }

  const current = videos[selected] ?? videos[0]

  return (
    <div>
      {/* Now-playing iframe — 16:9 ratio via padding-top so it stays
          crisp on any viewport. Keyed on video id so React remounts
          cleanly on card switch (that's what forces the new autoplay). */}
      <div
        style={{
          marginTop: 24,
          border: '1px solid rgba(225,225,213,0.18)',
          background: 'rgba(0,0,0,0.5)',
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9
        }}
      >
        <iframe
          key={current.id}
          src={buildEmbed(current, hasInteracted)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={current.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
          }}
        />
      </div>

      {/* Now-playing copy */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 24,
          flexWrap: 'wrap',
          padding: '18px 4px 0',
          color: 'var(--shell)',
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)' }}>
            — Now playing
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.02em', marginTop: 6 }}>
            {current.title}
          </div>
        </div>
        <a
          href={current.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            borderBottom: '1px solid currentColor',
            color: 'var(--shell)',
            opacity: 0.85,
          }}
        >
          Watch on YouTube ↗
        </a>
      </div>

      {/* Video selector — identical to the radio mix-list grid so the
          two sections visually rhyme. Clicking a card loads the video
          into the iframe above. */}
      <div
        className="mix-list"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${videos.length}, 1fr)`,
          gap: 4,
          marginTop: 32,
          borderTop: '1px solid rgba(225,225,213,0.18)',
        }}
      >
        {videos.map((v, i) => {
          const isActive = i === selected
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setHasInteracted(true)
                setSelected(i)
              }}
              className={`mix-item${isActive ? ' active' : ''}`}
              style={{
                padding: '28px 24px',
                borderRight: i < videos.length - 1 ? '1px solid rgba(225,225,213,0.18)' : '0',
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
                color: 'var(--shell)',
                textAlign: 'left',
                background: isActive ? 'rgba(0,0,0,0.55)' : 'transparent',
                border: 0,
                borderBottom: isActive ? '2px solid var(--chartreuse)' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                width: '100%',
              }}
              aria-pressed={isActive}
            >
              {/* Thumbnail */}
              <div style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: `#000 center/cover no-repeat url("${v.thumbnail}")`,
                border: '1px solid rgba(225,225,213,0.14)',
              }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.78 }}>
                  <span>— Show {v.showNum}</span>
                  <span>{isActive ? 'Now playing' : 'Watch ▶'}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.015em', lineHeight: 1.15, marginTop: 10, color: 'var(--shell)' }}>
                  {v.title}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

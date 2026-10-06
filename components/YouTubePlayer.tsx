'use client'

import { useState } from 'react'
import type { YouTubeVideo } from '@/lib/youtube'

const CHANNEL_URL = 'https://www.youtube.com/@TheHumanClub_Podcast'

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

/** "4 October 2026" format for the small line under the title. */
function fmtDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

type Props = {
  /** Server-fetched from the YouTube playlist RSS feed. Newest first. */
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
      {/* Now-playing iframe — 16:9 via padding-top. Keyed on video id so
          React remounts cleanly on card switch (that's what forces the
          new autoplay). */}
      <div
        style={{
          marginTop: 24,
          border: '1px solid rgba(225,225,213,0.18)',
          background: 'rgba(0,0,0,0.5)',
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
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

      {/* Video selector — horizontally scrollable row of fixed-width
          cards. No thumbnails (they were stretching + looking distorted
          at wide card widths). Mirrors the Music & Artists carousel
          pattern so the two scrollable rows feel the same. */}
      <div
        className="shows-scroll"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: 'clamp(260px, 32%, 340px)',
          gap: 0,
          marginTop: 32,
          borderTop: '1px solid rgba(225,225,213,0.18)',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(225,225,213,0.4) transparent',
          paddingBottom: 14,
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
                minHeight: 200,
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
                scrollSnapAlign: 'start',
                width: '100%',
              }}
              aria-pressed={isActive}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.78 }}>
                <span>— Show {v.showNum}</span>
                <span>{isActive ? 'Now playing' : 'Watch ▶'}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.015em', lineHeight: 1.15, marginTop: 'auto', color: 'var(--shell)' }}>
                {v.title}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, opacity: 0.72, color: 'var(--shell)' }}>
                — {fmtDate(v.publishedAt)}
              </div>
            </button>
          )
        })}
      </div>

      {/* Scroll cue — mirrors the Music & Artists "Scroll right" affordance
          so wider card lists hint that there's more off-screen. */}
      {videos.length > 1 && (
        <div className="scroll-right-cue" style={{ marginTop: 12 }}>
          <span className="l" />
          Scroll to view more
          <span className="arrow">→</span>
        </div>
      )}
    </div>
  )
}

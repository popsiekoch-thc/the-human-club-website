'use client'

import { useState } from 'react'
import type { Mix } from '@/lib/radio'

const SC_HANDLE_URL = 'https://soundcloud.com/thehumanclubradio'

const SC_PARAMS =
  '&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'

/** Build the SoundCloud embed URL. The URN `soundcloud:tracks:<id>` is
 *  double-URL-encoded so the player decodes it once back into the URN
 *  before hitting its API. */
function buildSrc(mix: Mix, autoplay: boolean): string {
  const trackUrl = `https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${mix.id}`
  return `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23${mix.color}&auto_play=${autoplay ? 'true' : 'false'}${SC_PARAMS}`
}

type Props = {
  /** Mixes are server-fetched from the SoundCloud RSS feed and passed
   *  in from THCRadio.tsx. Newest first. */
  mixes: Mix[]
}

export default function RadioPlayer({ mixes }: Props) {
  const [selected, setSelected] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Safety: if SoundCloud is temporarily empty or errored, show a CTA
  // instead of crashing.
  if (mixes.length === 0) {
    return (
      <div style={{ marginTop: 24, padding: '32px 22px', border: '1px solid rgba(225,225,213,0.18)', color: 'var(--shell)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.015em' }}>
          Browse the full library on SoundCloud
        </div>
        <a
          href={SC_HANDLE_URL}
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
          SoundCloud ↗
        </a>
      </div>
    )
  }

  const current = mixes[selected] ?? mixes[0]

  return (
    <div>
      {/* Now-playing iframe — keyed on the mix id so it remounts cleanly
          on every track switch. After the first user click, autoplay is
          allowed by browser policy (the page has a user-gesture). */}
      <div
        style={{
          marginTop: 24,
          border: '1px solid rgba(225,225,213,0.18)',
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        <iframe
          key={current.id}
          src={buildSrc(current, hasInteracted)}
          width="100%"
          height={300}
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media; clipboard-write"
          title={current.title}
          style={{ display: 'block', border: 0 }}
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
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(225,225,213,0.78)', marginTop: 4 }}>
            — {current.host}
          </div>
        </div>
        <a
          href={current.scUrl}
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
          Open on SoundCloud ↗
        </a>
      </div>

      {/* Mix selector — clicking a card loads it into the iframe above. */}
      <div
        className="mix-list"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${mixes.length}, 1fr)`,
          gap: 4,
          marginTop: 32,
          borderTop: '1px solid rgba(225,225,213,0.18)',
        }}
      >
        {mixes.map((m, i) => {
          const isActive = i === selected
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setHasInteracted(true)
                setSelected(i)
              }}
              className={`mix-item${isActive ? ' active' : ''}`}
              style={{
                padding: '36px 32px',
                borderRight: i < mixes.length - 1 ? '1px solid rgba(225,225,213,0.18)' : '0',
                minHeight: 260,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.78 }}>
                <span>— Mix {m.mixNum}</span>
                <span>{isActive ? 'Now playing' : 'Play ▶'}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 'auto', color: 'var(--shell)' }}>
                {m.title}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, opacity: 0.82, marginTop: 6, color: 'var(--shell)' }}>
                — {m.host}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

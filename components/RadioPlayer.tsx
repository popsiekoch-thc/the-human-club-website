'use client'

import { useState } from 'react'

type Mix = {
  /** SoundCloud track id (the digits after `/tracks/soundcloud:tracks:`) */
  id:    string
  /** SoundCloud accent colour (hex without the leading `#`) */
  color: string
  title: string
  host:  string
  /** human-friendly link for users that prefer the SC site */
  scUrl: string
}

const MIXES: Mix[] = [
  {
    id:    '2310193364',
    color: '673818',
    title: 'T.H.C Radio: Launch Event / Alle Anders',
    host:  'T.H.C Radio',
    scUrl: 'https://soundcloud.com/thehumanclubradio',
  },
  {
    id:    '2253969920',
    color: '673818',
    title: 'Plae — Dub Dayz @ Bodega',
    host:  'Aaron Zeederberg',
    scUrl: 'https://soundcloud.com/thehumanclubradio',
  },
  {
    id:    '2282268668',
    color: '848464',
    title: 'Popsie & Sav @ The Soma Boma ✦ Pandora Nexus 2026',
    host:  'Popsie & Sav',
    scUrl: 'https://soundcloud.com/pandorafestival',
  },
]

const SC_PARAMS =
  '&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'

function buildSrc(mix: Mix, autoplay: boolean): string {
  // SoundCloud's embed format: the URN `soundcloud:tracks:<id>` is double-
  // URL-encoded so the player decodes it once back into the URN before
  // hitting its API.
  const trackUrl = `https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${mix.id}`
  return `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23${mix.color}&auto_play=${autoplay ? 'true' : 'false'}${SC_PARAMS}`
}

export default function RadioPlayer() {
  const [selected, setSelected] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const current = MIXES[selected]

  return (
    <div>
      {/* Now-playing iframe — keyed on the mix id so it remounts cleanly on
          every track switch. After the first user click, autoplay=true is
          allowed by browser autoplay policy because the page now has a
          user-gesture in its history. */}
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

      {/* Mix selector — clicking a card loads it into the iframe above */}
      <div
        className="mix-list"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MIXES.length}, 1fr)`,
          gap: 4,
          marginTop: 24,
          borderTop: '1px solid rgba(225,225,213,0.18)',
        }}
      >
        {MIXES.map((m, i) => {
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
                padding: 22,
                borderRight: i < MIXES.length - 1 ? '1px solid rgba(225,225,213,0.18)' : '0',
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.75 }}>
                <span>— Mix {(i + 1).toString().padStart(2, '0')}</span>
                <span>{isActive ? 'Now playing' : 'Play ▶'}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.015em', lineHeight: 1.1, marginTop: 'auto', color: 'var(--shell)' }}>
                {m.title}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, opacity: 0.78, marginTop: 4, color: 'var(--shell)' }}>
                — {m.host}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

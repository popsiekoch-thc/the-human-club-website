'use client'

import { useState } from 'react'

type Props = {
  name:      string
  role:      string
  bio:       string
  ig:        string
  link:      string
  linkLabel: string
}

/**
 * Below-the-video block in each Creatives card.
 *
 * Bio uses the .talent-bio-clamp class which line-clamps to 6 lines on
 * desktop and 2 lines on mobile (rules live in globals.css). Tapping the
 * copy area toggles the clamp — desktop users can click too, mobile is
 * the primary target.
 */
export default function TalentInfo({ name, role, bio, ig, link, linkLabel }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="info">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="copy"
        aria-expanded={expanded}
        style={{
          background: 'transparent',
          border: 0,
          padding: 0,
          margin: 0,
          textAlign: 'left',
          color: 'inherit',
          font: 'inherit',
          cursor: 'pointer',
          width: '100%',
          display: 'block',
        }}
      >
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--shell)' }}>
          {name}
        </h3>
        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)', marginBottom: 10 }}>
          {role}
        </div>

        <div style={{ position: 'relative' }}>
          <p className={`talent-bio-clamp${expanded ? ' is-expanded' : ''}`}
             style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: 0, color: 'rgba(225,225,213,0.88)' }}>
            {bio}
          </p>
          {!expanded && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 0, right: 0, bottom: 0,
                height: 22,
                background: 'linear-gradient(180deg, rgba(27,25,24,0) 0%, rgba(27,25,24,0.85) 100%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        <span
          style={{
            display: 'inline-block',
            marginTop: 10,
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(225,225,213,0.7)',
            borderBottom: '1px solid currentColor',
          }}
        >
          {expanded ? '— Tap to collapse' : '— Tap to read more'}
        </span>
      </button>

      <div className="links" style={{ marginTop: 14 }}>
        <a
          href={ig}
          target="_blank"
          rel="noopener noreferrer"
          className="talent-ig-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
        >
          Instagram →
        </a>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="talent-alt-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}
        >
          {linkLabel} →
        </a>
      </div>
    </div>
  )
}

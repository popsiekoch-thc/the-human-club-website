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
 * Desktop: bio is fully visible at all times, no clamp, no fade,
 * no "Tap to read more" affordance.
 * Mobile (≤900px): bio clamped to 4 lines with a soft fade at the
 * bottom; the .talent-tap-more chip + button click toggle the clamp.
 *
 * The expand/collapse state is wired up regardless of viewport — clicks
 * just have no visible effect on desktop, which keeps the markup simple
 * and avoids any viewport-detection at render time.
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--shell)', textAlign: 'left' }}>
          {name}
        </h3>
        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)', marginBottom: 10, textAlign: 'left' }}>
          {role}
        </div>

        <div style={{ position: 'relative' }}>
          <p
            className={`talent-bio-clamp${expanded ? ' is-expanded' : ''}`}
            style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: 0, color: 'rgba(225,225,213,0.88)', textAlign: 'left' }}
          >
            {bio}
          </p>
          {/* Bottom fade overlay — visible only on mobile when clamped. */}
          <span className="talent-bio-fade" aria-hidden />
        </div>

        {/* "Tap to read more" — visible only on mobile. */}
        <span className="talent-tap-more">
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

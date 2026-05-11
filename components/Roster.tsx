import { getTalents } from '../lib/talent'
import RosterReel from './RosterReel'

const FRAME_COLORS = [
  'var(--ink)', 'var(--burgundy)', 'var(--tobacco)', 'var(--burgundy)', 'var(--ink)', 'var(--tobacco)',
]

export default async function Roster() {
  const roster = await getTalents()

  return (
    <section
      id="creatives"
      className="on-dark"
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '0 40px 100px',
        scrollMarginTop: 76,
      }}
    >
      {/* Dark overlay so the texture stays subtle and type stays legible */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
          <div className="num">— Page 01 / The Agency</div>
          <h2>The&nbsp;<em>Creatives.</em></h2>
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>Photographers, Directors, Creators, Influencers and Content creators; represented worldwide.</div>
        </div>

        <div
          className="roster-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 32px',
            marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(225,225,213,0.18)',
          }}
        >
          {roster.map((t, i) => (
            <article key={t.handle || t.name} className="talent">
              <RosterReel
                playbackId={t.muxPlaybackId}
                initial={t.initial}
                shortName={t.shortName}
                handle={t.handle}
                fallbackColor={FRAME_COLORS[i % FRAME_COLORS.length]}
                reelRatio={t.reelRatio}
              />

              <div className="info">
                <div className="copy">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 10px', color: 'var(--shell)' }}>
                    {t.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)', marginBottom: 12 }}>
                    {t.role}
                  </div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: '0 0 14px', maxWidth: 480, color: 'rgba(225,225,213,0.88)' }}>
                    {t.bio}
                  </p>
                </div>
                <div className="links">
                  <a
                    href={t.ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="talent-ig-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Instagram →
                  </a>
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="talent-alt-link"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    {t.linkLabel} →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

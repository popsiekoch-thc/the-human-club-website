import { getTalents } from '../lib/talent'
import RosterReel from './RosterReel'

const FRAME_COLORS = [
  'var(--page-black)', 'var(--burgundy)', 'var(--tobacco)', 'var(--burgundy)', 'var(--page-black)', 'var(--tobacco)',
]

export default async function Roster() {
  const roster = await getTalents()

  return (
    <section
      id="roster"
      style={{ background: 'var(--page-dark)', color: 'var(--shell)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'var(--border)' }}>
        <div className="num">— Page 01 / The Agency</div>
        <h2>The&nbsp;<em>Roster.</em></h2>
        <div className="aside" style={{ color: 'rgba(225,225,213,0.65)' }}>Photographers, directors and creators we represent across Berlin and Cape Town.</div>
      </div>

      <div
        className="roster-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 32px',
          marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)',
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
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.6)', marginBottom: 12 }}>
                  {t.role}
                </div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: '0 0 14px', maxWidth: 480, color: 'rgba(225,225,213,0.85)' }}>
                  {t.bio}
                </p>
              </div>
              <div className="links">
                <a
                  href={t.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talent-ig-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--shell)', border: '1px solid var(--shell)', padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  Instagram →
                </a>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talent-alt-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--shell)', border: '1px solid var(--shell)', padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {t.linkLabel} →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import { getTalents } from '../lib/talent'
import RosterReel from './RosterReel'
import TalentInfo from './TalentInfo'

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
        padding: '0 clamp(20px, 5vw, 40px) 100px',
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

              <TalentInfo
                name={t.name}
                role={t.role}
                bio={t.bio}
                ig={t.ig}
                link={t.link}
                linkLabel={t.linkLabel}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

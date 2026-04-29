import { getLatestMixes } from '@/lib/radio'

const SC_URL = 'https://soundcloud.com/thehumanclubradio'

export default async function THCRadio() {
  const mixes = await getLatestMixes()

  return (
    <section
      id="radio"
      className="on-dark"
      style={{ background: 'var(--tobacco)', color: 'var(--cream)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'rgba(232,223,207,0.25)' }}>
        <div className="num">— Page 04 / Radio</div>
        <h2>THC&nbsp;<em>Radio.</em></h2>
        <div className="aside" style={{ color: 'rgba(232,223,207,0.75)' }}>
          Live and recorded mixes from the artists on the roster — straight from our SoundCloud.
        </div>
      </div>

      {/* Player */}
      <div
        className="player-grid"
        style={{
          background: 'rgba(0,0,0,0.22)',
          border: '1px solid rgba(232,223,207,0.2)',
          padding: '28px 28px 24px',
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: '180px 1fr auto',
          gap: 28,
          alignItems: 'center',
        }}
      >
        <div style={{ width: 180, height: 180, background: 'var(--chartreuse)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.03em', lineHeight: 0.9, textAlign: 'center' }}>
            THC<br />RADIO
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7 }}>— Listen live</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, lineHeight: 1, letterSpacing: '-0.025em', margin: '6px 0 14px', color: 'var(--chartreuse)' }}>
            The Human Club Radio
          </h3>
          <div style={{ height: 4, background: 'rgba(232,223,207,0.18)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38%', background: 'var(--chartreuse)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', opacity: 0.7, marginTop: 8 }}>
            <span>SoundCloud</span><span>Updated weekly</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <a href={SC_URL} target="_blank" rel="noopener noreferrer" aria-label="Play THC Radio on SoundCloud"
             style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--chartreuse)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            ▶
          </a>
          <a href={SC_URL} target="_blank" rel="noopener noreferrer"
             style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.75, borderBottom: '1px solid currentColor' }}>
            SoundCloud ↗
          </a>
        </div>
      </div>

      {/* Mix list */}
      <div
        className="mix-list"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 24, borderTop: '1px solid rgba(232,223,207,0.2)' }}
      >
        {mixes.map((mix, i) => (
          <a
            key={mix.id}
            href={mix.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mix-item"
            style={{
              padding: 22,
              borderRight: i < mixes.length - 1 ? '1px solid rgba(232,223,207,0.2)' : '0',
              minHeight: 160,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: 'var(--cream)',
              textDecoration: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65 }}>
              <span>— Mix {mix.mixNum}</span>
              <span>{mix.duration}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.015em', lineHeight: 1.05, marginTop: 'auto' }}>
              {mix.title}
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              — {mix.artist}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

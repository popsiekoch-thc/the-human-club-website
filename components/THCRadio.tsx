import { getLatestMixes } from '@/lib/radio'

const SC_URL = 'https://soundcloud.com/thehumanclubradio'

export default async function THCRadio() {
  const mixes = await getLatestMixes()

  return (
    <section
      id="radio"
      className="on-dark"
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '0 40px 100px',
        scrollMarginTop: 76,
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
          <div className="num" style={{ color: 'var(--shell)' }}>— Page 04 / Radio</div>
          <h2 style={{ color: 'var(--shell)' }}>
            <span style={{ color: 'var(--chartreuse)' }}>THC</span>&nbsp;<em>Radio.</em>
          </h2>
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>
            Reposted mixes from the artists on the roster — straight from our SoundCloud.
          </div>
        </div>

        {/* Player block — green-grain inner per design */}
        <div
          className="player-grid"
          style={{
            background: '#4a4f1f url("/images/green-grain-br.png") center/cover no-repeat',
            color: 'var(--shell)',
            border: '1px solid rgba(225,225,213,0.18)',
            padding: '28px 28px 24px',
            marginTop: 24,
            display: 'grid',
            gridTemplateColumns: '180px 1fr auto',
            gap: 28,
            alignItems: 'center',
          }}
        >
          <div style={{ width: 180, height: 180, background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--shell)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.03em', lineHeight: 0.9, textAlign: 'center' }}>
              THC<br />RADIO
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, color: 'var(--shell)' }}>— Listen live</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, lineHeight: 1, letterSpacing: '-0.025em', margin: '6px 0 14px', color: 'var(--shell)' }}>
              The Human Club Radio
            </h3>
            <div style={{ height: 4, background: 'rgba(225,225,213,0.22)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38%', background: 'var(--shell)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', opacity: 0.7, marginTop: 8, color: 'var(--shell)' }}>
              <span>SoundCloud</span><span>Updated weekly</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
            <a
              href={SC_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play THC Radio on SoundCloud"
              style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--ink)', color: 'var(--shell)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid rgba(225,225,213,0.4)' }}
            >
              ▶
            </a>
            <a
              href={SC_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.75, borderBottom: '1px solid currentColor', color: 'var(--shell)' }}
            >
              SoundCloud ↗
            </a>
          </div>
        </div>

        {/* Mix list */}
        <div
          className="mix-list"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 24, borderTop: '1px solid rgba(225,225,213,0.18)' }}
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
                borderRight: i < mixes.length - 1 ? '1px solid rgba(225,225,213,0.18)' : '0',
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'var(--shell)',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>
                <span>— Mix {mix.mixNum}</span>
                <span>{mix.duration}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.015em', lineHeight: 1.05, marginTop: 'auto', color: 'var(--shell)' }}>
                {mix.title}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, opacity: 0.78, marginTop: 4, color: 'var(--shell)' }}>
                — {mix.artist}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

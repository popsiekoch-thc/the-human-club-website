const ARTISTS = [
  { initial: 'L', num: '01', name: 'Lemonella',        sc: 'https://soundcloud.com/lemonella' },
  { initial: 'F', num: '02', name: 'Femdelic',         sc: 'https://soundcloud.com/femdelic'  },
  { initial: 'A', num: '03', name: 'Aaron Zeederberg', sc: 'https://soundcloud.com/aaronzeedez' },
]

export default function MusicArtists() {
  return (
    <section
      id="music"
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
          <div className="num">— Page 02 / The Agency</div>
          <h2>Musicians&nbsp;&amp;&nbsp;<em>Artists.</em></h2>
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>
            The music we move with — booking and representation across Berlin and Cape Town.
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(225,225,213,0.18)' }}>
          <div className="artists-scroll" id="artistsScroll">
            {ARTISTS.map((a) => (
              <article key={a.name} className="artist-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <a
                  href={a.sc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    aspectRatio: '4/5',
                    background: 'rgba(225,225,213,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(225,225,213,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                  }}
                  aria-label={`${a.name} on SoundCloud`}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 120, color: 'rgba(225,225,213,0.55)', letterSpacing: '-0.04em' }}>
                    {a.initial}
                  </span>
                </a>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.6)', marginBottom: 6 }}>
                  — {a.num} / Artist
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, lineHeight: 0.96, letterSpacing: '-0.025em', margin: '0 0 10px', color: 'var(--shell)' }}>
                  {a.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontStyle: 'italic', fontSize: 12, color: 'rgba(225,225,213,0.6)', margin: 0, lineHeight: 1.55 }}>
                  Write-up to still be added. —{' '}
                  <a href={a.sc} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor' }}>SoundCloud ↗</a>
                </p>
              </article>
            ))}
          </div>
          <div className="scroll-right-cue">
            <span className="l" />
            Scroll right to view more
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  )
}

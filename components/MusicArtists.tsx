const ARTISTS = [
  { initial: 'L', num: '01', name: 'Lemonella',        sc: 'https://soundcloud.com/lemonella' },
  { initial: 'F', num: '02', name: 'Femdelic',         sc: 'https://soundcloud.com/femdelic'  },
  { initial: 'A', num: '03', name: 'Aaron Zeederberg', sc: 'https://soundcloud.com/aaronzeedez' },
]

export default function MusicArtists() {
  return (
    <section
      id="music"
      style={{ background: 'var(--shell)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'var(--border)' }}>
        <div className="num">— Page 02 / The Agency</div>
        <h2>Music&nbsp;&amp;&nbsp;<em>Artists.</em></h2>
        <div className="aside">The music we move with — booking and representation across Berlin and Cape Town.</div>
      </div>

      <div
        className="artists-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}
      >
        {ARTISTS.map((a) => (
          <article key={a.name} className="artist-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <a
              href={a.sc}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                aspectRatio: '4/5', background: 'var(--stone)',
                position: 'relative', overflow: 'hidden',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}
              aria-label={`${a.name} on SoundCloud`}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 120, color: 'rgba(27,25,24,0.22)', letterSpacing: '-0.04em' }}>
                {a.initial}
              </span>
            </a>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>
              — {a.num} / Artist
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, lineHeight: 0.96, letterSpacing: '-0.025em', margin: '0 0 10px' }}>
              {a.name}
            </h3>
            <p style={{ fontFamily: 'var(--font-ui)', fontStyle: 'italic', fontSize: 12, opacity: 0.55, margin: 0, lineHeight: 1.55 }}>
              Write-up to still be added. —{' '}
              <a href={a.sc} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor' }}>SoundCloud ↗</a>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

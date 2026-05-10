import { getArtists } from '../lib/artist'

export default async function MusicArtists() {
  const artists = await getArtists()

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
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }} />
        </div>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(225,225,213,0.18)' }}>
          <div className="artists-scroll" id="artistsScroll">
            {artists.map((a) => (
              <article key={a.name} className="artist-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <a
                  href={a.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.name} on SoundCloud`}
                  style={{
                    /* Square crop — Instagram-feed-post sized — fills the
                       majority of the card and translates cleanly to mobile. */
                    aspectRatio: '1 / 1',
                    width: '100%',
                    background: 'rgba(225,225,213,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(225,225,213,0.18)',
                    display: 'block',
                    marginBottom: 18,
                  }}
                >
                  {a.photoUrl ? (
                    /* Plain <img> rather than <Image> so the Sanity CDN URL
                       passes through untouched — no domain whitelist
                       gymnastics on Vercel. */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.photoUrl}
                      alt={a.name}
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <span style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 120, color: 'rgba(225,225,213,0.55)',
                      letterSpacing: '-0.04em',
                    }}>
                      {a.initial}
                    </span>
                  )}
                </a>

                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.6)', marginBottom: 6 }}>
                  — {a.num} / Artist
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, lineHeight: 0.96, letterSpacing: '-0.025em', margin: '0 0 10px', color: 'var(--shell)' }}>
                  {a.name}
                </h3>

                {a.bio ? (
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: '0 0 12px', color: 'rgba(225,225,213,0.85)', whiteSpace: 'pre-line' }}>
                    {a.bio}
                  </p>
                ) : (
                  <p style={{ fontFamily: 'var(--font-ui)', fontStyle: 'italic', fontSize: 12, color: 'rgba(225,225,213,0.6)', margin: '0 0 12px', lineHeight: 1.55 }}>
                    Write-up to still be added.
                  </p>
                )}

                <a
                  href={a.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--shell)',
                    borderBottom: '1px solid currentColor',
                    alignSelf: 'flex-start',
                  }}
                >
                  SoundCloud ↗
                </a>
              </article>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', marginTop: 14 }}>
            <div className="scroll-right-cue" style={{ margin: 0 }}>
              <span className="l" />
              Scroll right to view more
              <span className="arrow">→</span>
            </div>
            <p style={{
              margin: 0,
              maxWidth: 360,
              textAlign: 'right',
              fontFamily: 'var(--font-ui)',
              fontStyle: 'italic',
              fontSize: 13,
              lineHeight: 1.55,
              color: 'rgba(225,225,213,0.78)',
            }}>
              Musicians, Artists &amp; Experience Designers located in Berlin, Cape Town &amp; Worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

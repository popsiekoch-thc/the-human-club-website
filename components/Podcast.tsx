import { getLatestEpisodes } from '@/lib/podcast'
import Button from './Button'

export default async function Podcast() {
  const episodesRaw = await getLatestEpisodes()

  // Sort: highest episode number at top, oldest at bottom.
  const episodes = [...episodesRaw].sort((a, b) => {
    return parseInt(b.episodeNum, 10) - parseInt(a.episodeNum, 10)
  })

  return (
    <section
      id="podcast"
      className="on-dark podcast-section"
      style={{
        background: '#4a4f1f url("/images/green-grain-br.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '0 40px 100px',
        scrollMarginTop: 76,
      }}
    >
      <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
        <div className="num" style={{ color: 'var(--shell)' }}>— Page 03 / Podcast</div>
        <h2 style={{ color: 'var(--shell)' }}>
          The&nbsp;Human&nbsp;Club<br />
          Podcast<span style={{ color: 'var(--shell)', fontStyle: 'italic', fontWeight: 400 }}>.</span>
        </h2>
        <div className="aside" style={{ color: 'rgba(225,225,213,0.78)' }}>
          Conversations with the people making culture.
          <span style={{ display: 'block', marginTop: 8 }}>
            <a href="https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--shell)' }}>
              Apple Podcasts ↗
            </a>
          </span>
          <span style={{ display: 'block', marginTop: 4 }}>
            <a href="https://www.youtube.com/@TheHumanClub_Worldwide" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--shell)' }}>
              YouTube ↗
            </a>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        {episodes.map((ep) => (
          <article
            key={ep.guid}
            className={`ep-row${ep.featured ? ' featured' : ''}`}
            style={{
              padding: '20px 16px',
              borderTop: '1px solid rgba(225,225,213,0.22)',
              background: 'rgba(27,25,24,0.5)',
              color: 'var(--shell)',
            }}
          >
            {/* Meta row — episode number, title, Apple link */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: 24,
                alignItems: 'center',
                marginBottom: ep.podbeanSrc ? 14 : 0,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--shell)' }}>
                {ep.episodeNum}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.015em', color: 'var(--shell)' }}>
                  {ep.title}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.65)', marginTop: 4 }}>
                  — Episode {ep.episodeNum}
                </div>
              </div>
              <a
                href={ep.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--shell)',
                  borderBottom: '1px solid currentColor',
                }}
              >
                Apple ↗
              </a>
            </div>

            {/* Inline Podbean player — only when a src is mapped for this trackId */}
            {ep.podbeanSrc && (
              <iframe
                src={ep.podbeanSrc}
                title={ep.title}
                height={150}
                width="100%"
                loading="lazy"
                scrolling="no"
                style={{
                  border: 0,
                  display: 'block',
                  background: 'transparent',
                }}
              />
            )}
          </article>
        ))}
        <div style={{ borderTop: '1px solid rgba(225,225,213,0.22)' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 22, gap: 24, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)' }}>
          — All podcasts can be watched on YouTube at{' '}
          <a href="https://www.youtube.com/@TheHumanClub_Worldwide" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--shell)', borderBottom: '1px solid currentColor', textTransform: 'none', letterSpacing: 0 }}>
            The Human Club Worldwide
          </a>
        </div>
        <Button
          label="Watch on YouTube"
          hoverLabel="Open YouTube"
          href="https://www.youtube.com/@TheHumanClub_Worldwide"
          target="_blank"
          variant="burgundy"
        />
      </div>
    </section>
  )
}

import { getLatestEpisodes } from '@/lib/podcast'
import Button from './Button'

/** Default accent — ink play boxes on the burgundy field. */
const ROW_ACCENT = { bg: 'var(--page-black)', fg: 'var(--shell)' }

export default async function Podcast() {
  const episodesRaw = await getLatestEpisodes()

  // Sort: ep 4 at top, ep 1 at bottom (descending by episodeNum)
  const episodes = [...episodesRaw].sort((a, b) => {
    return parseInt(b.episodeNum, 10) - parseInt(a.episodeNum, 10)
  })

  return (
    <section
      id="podcast"
      style={{ background: 'var(--burgundy)', color: 'var(--shell)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
        <div className="num" style={{ color: 'var(--shell)' }}>— Page 03 / Podcast</div>
        <h2 style={{ color: 'var(--shell)' }}>
          The&nbsp;Human&nbsp;Club<br />
          Podcast<span style={{ color: 'var(--shell)', fontStyle: 'italic', fontWeight: 400 }}>.</span>
        </h2>
        <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>
          Conversations with the people making culture.{' '}
          <a href="https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--shell)' }}>
            Apple Podcasts ↗
          </a>
          &nbsp;
          <a href="https://www.youtube.com/@TheHumanClub_Worldwide" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--shell)' }}>
            YouTube ↗
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        {episodes.map((ep) => {
          return (
            <a
              key={ep.guid}
              href={ep.appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`ep-row${ep.featured ? ' featured' : ''}`}
              style={{
                ['--row-bg' as string]: ROW_ACCENT.bg,
                ['--row-fg' as string]: ROW_ACCENT.fg,
                display: 'grid',
                gridTemplateColumns: '80px 100px 1fr auto auto',
                gap: 28,
                alignItems: 'center',
                padding: '20px 4px',
                borderTop: '1px solid rgba(225,225,213,0.2)',
                color: 'var(--shell)',
                textDecoration: 'none',
              } as React.CSSProperties}
            >
              <div className="ep-num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--shell)' }}>
                {ep.episodeNum}
              </div>
              <div
                className="ep-art"
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--page-black)',
                  color: 'var(--shell)',
                }}
                aria-hidden
              >▶</div>
              <div>
                <div className="ep-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.015em', color: 'var(--shell)' }}>
                  {ep.title}
                </div>
                <div className="ep-guest" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.65)', marginTop: 4 }}>
                  — Episode {ep.episodeNum}
                </div>
              </div>
              <div className="ep-dur" style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.65)' }}>
                Apple ↗
              </div>
              <div
                className="ep-play-btn"
                style={{
                  width: 48, height: 48, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--page-black)',
                  color: 'var(--shell)',
                }}
                aria-hidden
              >▶</div>
            </a>
          )
        })}
        <div style={{ borderTop: '1px solid rgba(225,225,213,0.2)' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 22, gap: 24, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.65)' }}>
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
        />
      </div>
    </section>
  )
}

import { getLatestEpisodes } from '@/lib/podcast'
import Button from './Button'

const ART_COLORS = [
  { bg: 'var(--ink)',        color: 'var(--cream)' },
  { bg: 'var(--sky)',        color: 'var(--cream)' },
  { bg: 'var(--chartreuse)', color: 'var(--ink)'   },
  { bg: 'var(--orange)',     color: 'var(--ink)'   },
]

export default async function Podcast() {
  const episodes = await getLatestEpisodes()

  return (
    <section
      id="podcast"
      className="on-dark"
      style={{ background: 'var(--burgundy)', color: 'var(--cream)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'rgba(232,223,207,0.25)' }}>
        <div className="num">— Page 03 / Podcast</div>
        <h2>
          The&nbsp;Human&nbsp;Club<br />
          Podcast<span style={{ color: 'var(--chartreuse)' }}>.</span>
        </h2>
        <div className="aside" style={{ color: 'rgba(232,223,207,0.78)' }}>
          Conversations with the people making culture.{' '}
          <a href="https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--chartreuse)' }}>
            Apple Podcasts ↗
          </a>
          &nbsp;
          <a href="https://www.youtube.com/@TheHumanClub_Worldwide" target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--chartreuse)' }}>
            YouTube ↗
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        {episodes.map((ep, i) => (
          <a
            key={ep.guid}
            href={ep.appleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ep-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 100px 1fr auto auto',
              gap: 28,
              alignItems: 'center',
              padding: '20px 4px',
              borderTop: '1px solid rgba(232,223,207,0.2)',
              color: 'var(--cream)',
              textDecoration: 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--chartreuse)' }}>
              {ep.episodeNum}
            </div>
            <div
              className="ep-art"
              style={{ aspectRatio: '1', background: ART_COLORS[i % ART_COLORS.length].bg, color: ART_COLORS[i % ART_COLORS.length].color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-hidden
            >▶</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.015em' }}>
                {ep.title}
              </div>
              <div className="ep-guest" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.65)', marginTop: 4 }}>
                — Episode {ep.episodeNum}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.7)' }}>
              Apple ↗
            </div>
            <div
              className="ep-play-btn"
              style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--chartreuse)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-hidden
            >▶</div>
          </a>
        ))}
        <div style={{ borderTop: '1px solid rgba(232,223,207,0.2)' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 22, gap: 24, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.7)' }}>
          — All podcasts can be watched on YouTube at{' '}
          <a href="https://www.youtube.com/@TheHumanClub_Worldwide" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--chartreuse)', borderBottom: '1px solid currentColor', textTransform: 'none', letterSpacing: 0 }}>
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

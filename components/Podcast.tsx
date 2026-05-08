import { getLatestEpisodes } from '@/lib/podcast'
import Button from './Button'
import EpisodeRow from './EpisodeRow'

const YT_URL = 'https://www.youtube.com/@TheHumanClub_Podcast'

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
            <a href={YT_URL} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid currentColor', color: 'var(--shell)' }}>
              YouTube ↗
            </a>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        {episodes.map((ep) => (
          <EpisodeRow
            key={ep.guid}
            episodeNum={ep.episodeNum}
            title={ep.title}
            appleUrl={ep.appleUrl}
            audioUrl={ep.audioUrl}
            featured={ep.featured}
          />
        ))}
        <div style={{ borderTop: '1px solid rgba(225,225,213,0.22)' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 22, gap: 24, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)' }}>
          — All podcasts can be watched on YouTube at{' '}
          <a href={YT_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--shell)', borderBottom: '1px solid currentColor', textTransform: 'none', letterSpacing: 0 }}>
            The Human Club Podcast
          </a>
        </div>
        <Button
          label="Watch on YouTube"
          hoverLabel="Open YouTube"
          href={YT_URL}
          target="_blank"
          variant="burgundy"
        />
      </div>
    </section>
  )
}

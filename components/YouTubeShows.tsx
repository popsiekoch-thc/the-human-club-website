import YouTubePlayer from './YouTubePlayer'
import { getLatestYouTubeShows } from '@/lib/youtube'

/**
 * T.H.C Radio Shows — the YouTube counterpart to T.H.C Radio.
 * Sits directly below the SoundCloud section and auto-syncs with the
 * playlist https://www.youtube.com/playlist?list=PLI9uodLFtg0A
 * via lib/youtube.ts (5-min server revalidate).
 *
 * Styling mirrors THCRadio so the two sections rhyme: brown-stone bg,
 * same section-head grid, shell type.
 */
export default async function YouTubeShows() {
  const videos = await getLatestYouTubeShows(3)

  return (
    <section
      id="shows"
      className="on-dark"
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '0 clamp(20px, 5vw, 40px) 100px',
        scrollMarginTop: 76,
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
          <div className="num" style={{ color: 'var(--shell)' }}>— Page 05 / Shows</div>
          <h2 style={{ color: 'var(--shell)' }}>
            <span style={{ color: 'var(--shell)' }}>T.H.C</span>&nbsp;
            <em style={{ color: 'var(--chartreuse)', fontStyle: 'italic', fontWeight: 400 }}>Shows.</em>
          </h2>
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>
            Full show recordings — straight from our YouTube channel.
          </div>
        </div>

        <YouTubePlayer videos={videos} />
      </div>
    </section>
  )
}

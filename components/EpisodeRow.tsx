'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  episodeNum: string
  title:      string
  appleUrl:   string
  audioUrl?:  string
  /** when true, render the muted .featured row treatment from globals.css */
  featured?:  boolean
}

/**
 * One episode row, restored to the original 5-column layout but with a
 * working custom HTML5 audio player attached to the play button on the
 * right. No iframe, no white Podbean chrome — just the brand styling.
 *
 * Coordination: when the user starts one episode, every other <audio> on
 * the page is paused so only one plays at a time.
 */
export default function EpisodeRow({ episodeNum, title, appleUrl, audioUrl, featured }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  function togglePlay(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const a = audioRef.current
    if (!a || !audioUrl) return
    setHasInteracted(true)
    if (a.paused) {
      // pause every other audio in the document so only one episode plays
      document.querySelectorAll<HTMLAudioElement>('audio[data-episode-player]').forEach((other) => {
        if (other !== a) other.pause()
      })
      a.play().catch(() => { /* autoplay block, etc. */ })
    } else {
      a.pause()
    }
  }

  function onScrub(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current
    if (!a || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    a.currentTime = pct * duration
    setProgress(a.currentTime)
  }

  // Mount-time event listeners on the audio el so React state stays in sync
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay   = () => setPlaying(true)
    const onPause  = () => setPlaying(false)
    const onEnd    = () => { setPlaying(false); setProgress(0) }
    const onTime   = () => setProgress(a.currentTime)
    const onMeta   = () => setDuration(a.duration || 0)
    a.addEventListener('play',          onPlay)
    a.addEventListener('pause',         onPause)
    a.addEventListener('ended',         onEnd)
    a.addEventListener('timeupdate',    onTime)
    a.addEventListener('loadedmetadata', onMeta)
    return () => {
      a.removeEventListener('play',          onPlay)
      a.removeEventListener('pause',         onPause)
      a.removeEventListener('ended',         onEnd)
      a.removeEventListener('timeupdate',    onTime)
      a.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  const showProgress = hasInteracted && audioUrl
  const pct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <article
      className={`ep-row${featured ? ' featured' : ''}${playing ? ' is-playing' : ''}`}
      style={{
        display: 'block',
        padding: '20px 16px',
        borderTop: '1px solid rgba(225,225,213,0.22)',
        background: 'rgba(27,25,24,0.5)',
        color: 'var(--shell)',
      }}
    >
      {/* Original 5-column row layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 100px 1fr auto auto',
          gap: 28,
          alignItems: 'center',
        }}
      >
        <div className="ep-num" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--shell)' }}>
          {episodeNum}
        </div>

        <div
          className="ep-art"
          aria-hidden
          style={{
            aspectRatio: '1',
            background: 'rgba(0,0,0,0.5)',
            color: 'var(--shell)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* small dark thumbnail with play glyph */}
          ▶
        </div>

        <div>
          <div className="ep-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.015em', color: 'var(--shell)' }}>
            {title}
          </div>
          <div className="ep-guest" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.65)', marginTop: 4 }}>
            — Episode {episodeNum}
          </div>
        </div>

        <a
          href={appleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ep-dur"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(225,225,213,0.78)',
            textDecoration: 'none',
            borderBottom: '1px solid currentColor',
          }}
        >
          Apple ↗
        </a>

        <button
          type="button"
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          onClick={togglePlay}
          disabled={!audioUrl}
          className="ep-play-btn"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: audioUrl ? 'pointer' : 'not-allowed',
            opacity: audioUrl ? 1 : 0.4,
            background: 'rgba(0,0,0,0.5)',
            color: 'var(--shell)',
            border: '1px solid rgba(225,225,213,0.3)',
            padding: 0,
            fontFamily: 'inherit',
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          {playing ? (
            // pause glyph — two bars
            <span style={{ display: 'inline-flex', gap: 3 }}>
              <span style={{ display: 'inline-block', width: 3, height: 14, background: 'currentColor' }} />
              <span style={{ display: 'inline-block', width: 3, height: 14, background: 'currentColor' }} />
            </span>
          ) : (
            <span aria-hidden>▶</span>
          )}
        </button>
      </div>

      {/* Progress + scrubber — only after first interaction so the layout
          stays clean until the user actually plays an episode. */}
      {showProgress && (
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '60px 1fr 60px', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(225,225,213,0.78)' }}>
            {formatTime(progress)}
          </span>
          <div
            onClick={onScrub}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={progress}
            tabIndex={0}
            style={{
              height: 4,
              background: 'rgba(225,225,213,0.22)',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: 'var(--chartreuse)' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(225,225,213,0.78)', textAlign: 'right' }}>
            {formatTime(duration)}
          </span>
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          data-episode-player
          style={{ display: 'none' }}
        />
      )}
    </article>
  )
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '–:––'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

'use client'

import MuxPlayer from '@mux/mux-player-react'

type Props = {
  playbackId?: string
  initial: string
  shortName: string
  handle: string
  fallbackColor: string
}

export default function RosterReel({ playbackId, initial, shortName, handle, fallbackColor }: Props) {
  if (playbackId) {
    return (
      <div style={{
        aspectRatio: '4/5',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--ink)',
      }}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={playbackId}
          metadataVideoTitle={`${shortName} — talent reel`}
          accentColor="#C7E66A"
          style={{ width: '100%', height: '100%', aspectRatio: '4/5' }}
        />
        <span style={{ position: 'absolute', left: 12, top: 12, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.78)', zIndex: 2, pointerEvents: 'none' }}>
          — Reel
        </span>
      </div>
    )
  }

  return (
    <div style={{
      aspectRatio: '4/5',
      background: fallbackColor,
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid var(--border)',
    }}>
      <span style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 100, color: 'rgba(232,223,207,0.18)', letterSpacing: '-0.04em',
        background: 'repeating-linear-gradient(45deg, rgba(232,223,207,0.04) 0 2px, transparent 2px 22px)',
      }}>{initial}</span>
      <span style={{ position: 'absolute', left: 12, top: 12, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.78)', zIndex: 2 }}>
        — Reel
      </span>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', background: 'var(--chartreuse)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 2 }}>
        ▶
      </span>
      <span style={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.7)', zIndex: 2 }}>
        <span>{shortName}</span><span>{handle}</span>
      </span>
    </div>
  )
}

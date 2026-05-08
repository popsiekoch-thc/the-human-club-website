'use client'

import MuxPlayer from '@mux/mux-player-react'

type Props = {
  playbackId?: string
  initial: string
  shortName: string
  handle: string
  fallbackColor: string
  /** override the placeholder frame's aspect ratio for square / landscape reels */
  reelRatio?: string
}

export default function RosterReel({ playbackId, initial, shortName, handle, fallbackColor, reelRatio }: Props) {
  /* ─────────────────────────────────────────────────────────────────────
     PAGE 1 LOCK-IN — when a Mux playbackId is provided, render the player
     in a BARE wrapper:
       • no background-color
       • no border
       • no forced aspect-ratio
     The video keeps its native Mux dimensions. The .talent .frame.mux
     selector in globals.css strips every chrome property the placeholder
     frame would otherwise inherit.
     ───────────────────────────────────────────────────────────────────── */
  if (playbackId) {
    return (
      <div
        className="frame mux"
        style={{
          background: 'transparent',
          border: 0,
          aspectRatio: 'auto',
          overflow: 'visible',
          padding: 0,
        }}
      >
        <MuxPlayer
          streamType="on-demand"
          playbackId={playbackId}
          metadataVideoTitle={`${shortName} — talent reel`}
          accentColor="#7f8948"
          style={{
            width: '100%',
            height: 'auto',
            background: 'transparent',
            display: 'block',
          }}
        />
      </div>
    )
  }

  /* No Mux → coloured placeholder frame, 4:5 by default. */
  const frameStyle = (reelRatio
    ? ({ '--reel-ratio': reelRatio, background: fallbackColor } as React.CSSProperties)
    : ({ background: fallbackColor } as React.CSSProperties))

  return (
    <div className="frame" style={frameStyle}>
      <span style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 100, color: 'rgba(225,225,213,0.18)', letterSpacing: '-0.04em',
        background: 'repeating-linear-gradient(45deg, rgba(225,225,213,0.04) 0 2px, transparent 2px 22px)',
      }}>{initial}</span>
      <span style={{ position: 'absolute', left: 12, top: 12, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.78)', zIndex: 2 }}>
        — Reel
      </span>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', background: 'var(--chartreuse)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 2 }}>
        ▶
      </span>
      <span style={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.7)', zIndex: 2 }}>
        <span>{shortName}</span><span>{handle}</span>
      </span>
    </div>
  )
}

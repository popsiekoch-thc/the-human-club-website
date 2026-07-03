'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

/**
 * Landing cover.
 *
 * Desktop: dark stone hero with a foggy-glass cursor reveal, centred
 * wordmark, and a bottom-bar tagline.
 *
 * Mobile: same dark stone + centred wordmark, but fog / cursor /
 * scroll-cue are all hidden via CSS (.cover-fog etc.). The continuation
 * of the landing copy lives in <MobileLandingFlow /> below this section.
 */
export default function Cover() {
  const fogRef    = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const hintRef   = useRef<HTMLDivElement>(null)
  const movesRef  = useRef(0)
  const clearedRef = useRef(false)

  const setMask = useCallback((x: number, y: number, r: number) => {
    if (!fogRef.current) return
    const m = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0%, transparent 60%, black 100%)`
    fogRef.current.style.webkitMaskImage = m
    fogRef.current.style.maskImage       = m
  }, [])

  useEffect(() => {
    const cover  = document.getElementById('cover')
    const fog    = fogRef.current
    const cursor = cursorRef.current
    const hint   = hintRef.current
    if (!cover || !fog || !cursor || !hint) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      fog.style.opacity = '0'
      return
    }

    // Touch / phone users never get the fog interaction at all — the
    // viewport-width check matches the 900px mobile breakpoint in CSS.
    const isMobile = window.matchMedia('(max-width: 900px)').matches
    if (isMobile) {
      fog.style.opacity = '0'
      return
    }

    function onMove(e: MouseEvent) {
      const rect = cover!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cursor!.style.left = x + 'px'
      cursor!.style.top  = y + 'px'
      if (!clearedRef.current) {
        movesRef.current++
        const r = Math.min(160 + movesRef.current * 12, 1200)
        setMask(x, y, r)
        if (movesRef.current >= 4)  hint!.style.opacity = '0'
        if (movesRef.current > 60) {
          fog!.style.opacity = '0'
          clearedRef.current = true
        }
      }
    }

    function onLeave() { cursor!.style.opacity = '0' }
    function onEnter() { cursor!.style.opacity = '1' }

    cover.addEventListener('mousemove', onMove)
    cover.addEventListener('mouseleave', onLeave)
    cover.addEventListener('mouseenter', onEnter)
    return () => {
      cover.removeEventListener('mousemove', onMove)
      cover.removeEventListener('mouseleave', onLeave)
      cover.removeEventListener('mouseenter', onEnter)
    }
  }, [setMask])

  /**
   * Mobile-only scroll-trigger for the three-line tagline overlay
   * (.cover-mobile-overlay → .cover-mobile-line). Each line reveals at
   * its own scroll threshold so the copy fades in sequentially as the
   * user starts scrolling away from the cover. Listener runs on every
   * viewport (it's cheap) but the overlay itself is hidden on desktop
   * via CSS, so revealing classes there has no visible effect.
   */
  useEffect(() => {
    const lines = Array.from(document.querySelectorAll<HTMLElement>('.cover-mobile-line'))
    if (!lines.length) return
    function onScroll() {
      const vh = window.innerHeight
      const y  = window.scrollY
      lines.forEach((line, i) => {
        // line 0 reveals at 4% of vh, 1 at 12%, 2 at 20%
        const threshold = vh * (0.04 + i * 0.08)
        if (y > threshold) line.classList.add('is-revealed')
        else               line.classList.remove('is-revealed')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="cover"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '720px',
        background: '#2a2522',
        overflow: 'hidden',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background image */}
      <Image
        src="/images/logotype-brown-stone-bg.png"
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(27,25,24,0.55), rgba(27,25,24,0.35) 50%, rgba(27,25,24,0.6))',
          pointerEvents: 'none',
        }}
      />

      {/* Single centred stack — wordmark → eyebrow → tagline → dot cue.
          Everything visible in the first viewport as one coherent
          composition. Compact spacing per the desktop spec. */}
      <div className="cover-center-stack" style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 32px',
        width: '100%',
        maxWidth: 1200,
      }}>
        {/* Wordmark */}
        <Image
          src="/images/logotype-stone.png"
          alt="The Human Club"
          width={920}
          height={300}
          style={{ maxWidth: '720px', width: '58%' }}
          priority
        />

        {/* Eyebrow — 22px under the wordmark */}
        <span style={{
          marginTop: 22,
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--shell)',
          opacity: 0.92,
          textAlign: 'center',
        }}>
          A Creative Collective Agency
        </span>

        {/* Tagline — desktop only. Sits ~40px below the eyebrow so it
            reads as one coherent block with the hero, not a separate
            section. Compact vertical rhythm throughout. */}
        <div
          className="cover-desktop-tagline"
          style={{
            marginTop: 40,
            maxWidth: 640,
            opacity: 0.92,
            color: 'var(--shell)',
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            lineHeight: 1.55,
            textAlign: 'center',
          }}
        >
          {/* Heading */}
          <strong style={{ display: 'block', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--shell)' }}>
            House multi-disciplinary creatives.
          </strong>

          {/* Discipline list — bold, chartreuse, non-italic. 28px below
              the heading, 9px between each item so the list reads as one
              compact block. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, color: 'var(--chartreuse)', fontWeight: 700, fontStyle: 'normal', alignItems: 'center', marginTop: 28 }}>
            <span>Content Creators</span>
            <span>User Generated Content Creators</span>
            <span>Photographers</span>
            <span>Videographers</span>
            <span>Sound Designers</span>
            <span>Event Performers</span>
            <span>Experience Designers</span>
            <span>Musicians</span>
            <span>DJ&apos;s</span>
          </div>

          {/* Audio-experiences line — 36px below the list */}
          <div style={{ marginTop: 36 }}>
            The Human Club also welcomes you to our audio experiences:{' '}
            <strong style={{ color: 'var(--chartreuse)', fontWeight: 700 }}>
              The Human Club Podcast &amp; T.H.C Radio.
            </strong>
          </div>

          {/* Offering line — 20px above (from the audio line above) */}
          <em style={{ display: 'block', marginTop: 20, fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--shell)', opacity: 0.85 }}>
            Offering private social media consultancy for influencers.
          </em>

          {/* Small dot / scroll indicator, ~28px below the offering.
              Pulses subtly to signal there is content below. */}
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--chartreuse)',
                opacity: 0.75,
                animation: 'cover-dot-pulse 2.4s cubic-bezier(0.22,0.61,0.36,1) infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile-only three-line scroll-trigger overlay. Each .cover-mobile-line
          fades in at a staggered scrollY threshold (Cover.tsx useEffect).
          Sits within the cover's lower portion so the wordmark stays
          centred above it on first load. */}
      <div className="cover-mobile-overlay" aria-hidden>
        <span className="cover-mobile-line">Built for humans.</span>
        <span className="cover-mobile-line">Run by humans.</span>
        <span className="cover-mobile-line">Created for humans.</span>
      </div>

      {/* Bottom-right "Working from" corner — desktop only. The rest of
          the previous bottom-bar tagline moved into the centre stack
          above. Class .cover-desktop-tagline is dropped from here (that
          class now lives on the new centre tagline block) and the
          working-from is tagged with its own mobile-hide class. */}
      <div
        className="cover-desktop-workingfrom"
        style={{
          position: 'absolute', right: 32, bottom: 28, zIndex: 6,
          textAlign: 'right', opacity: 0.72, maxWidth: 320,
          color: 'var(--shell)', fontFamily: 'var(--font-ui)',
          fontSize: '12px', lineHeight: 1.55,
        }}
      >
        <strong style={{ display: 'block', color: 'var(--shell)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '10px', marginBottom: 4 }}>
          — Working from
        </strong>
        Berlin &amp; Cape Town<br />Partnering worldwide.
      </div>

      {/* Fog hint — bottom of cover, desktop only. */}
      <div
        ref={hintRef}
        className="cover-fog-hint"
        style={{
          position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          zIndex: 6, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '10px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(232,223,207,0.55)', transition: 'opacity 600ms',
        }}
      >
        — Move your cursor to clear the fog
      </div>

      {/* Fog overlay — full cover, desktop only. */}
      <div
        ref={fogRef}
        aria-hidden
        className="cover-fog"
        style={{
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          backdropFilter: 'blur(28px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.1)',
          background: 'rgba(232,223,207,0.22)',
          transition: 'opacity 1400ms cubic-bezier(0.22,0.61,0.36,1)',
          WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 30%, black 100%)',
          maskImage: 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 30%, black 100%)',
        }}
      />

      {/* Cursor dot — desktop only */}
      <div
        ref={cursorRef}
        aria-hidden
        className="cover-cursor hidden tablet:block"
        style={{
          position: 'absolute', zIndex: 7,
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--shell)', pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'opacity 400ms',
        }}
      />
    </section>
  )
}

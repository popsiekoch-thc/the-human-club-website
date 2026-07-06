'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Landing cover — three-stage reveal on desktop.
 *
 *   STAGE 1  Fog. Existing haze + "move your cursor to clear the fog"
 *            hint. Untouched.
 *   STAGE 2  Fog cleared → wordmark + "A Creative Collective Agency"
 *            eyebrow visible together (as one centred lockup), plus
 *            the nav and the "Working from" corner. Everything below
 *            (heading, list, audio, offering, dot) still opacity:0.
 *   STAGE 3  The NEXT mousemove or scroll after Stage 2 fades the
 *            remaining tagline block in (opacity + slight upward
 *            translate, ~700ms ease-out).
 *
 * Mobile / touch / prefers-reduced-motion: fog is set to opacity 0
 * on mount and both fogCleared + contentRevealed flip true so users
 * are never stuck on a blank hero.
 *
 * Layout notes
 * ------------
 * Everything sits in a single flex column with a consistent 22px gap
 * between rows: wordmark → eyebrow → tagline block (heading). This
 * gives the eyebrow → heading the same spacing as the wordmark →
 * eyebrow, per the design request.
 *
 * The wordmark is centred at exact 50vh via `padding-top: calc(50vh
 * − wordmarkHalfPx)`, where `wordmarkHalfPx` is measured on mount
 * (via ref.offsetHeight / 2) and updated on resize.
 */
export default function Cover() {
  const fogRef      = useRef<HTMLDivElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)
  const hintRef     = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const movesRef    = useRef(0)
  const clearedRef  = useRef(false)

  const [fogCleared,      setFogCleared]      = useState(false)
  const [contentRevealed, setContentRevealed] = useState(false)
  const [wordmarkHalf,    setWordmarkHalf]    = useState(118) // reasonable desktop default

  const setMask = useCallback((x: number, y: number, r: number) => {
    if (!fogRef.current) return
    const m = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0%, transparent 60%, black 100%)`
    fogRef.current.style.webkitMaskImage = m
    fogRef.current.style.maskImage       = m
  }, [])

  /* -----------------------------------------------------------------
     Wordmark measurement — used by padding-top calc to keep the
     wordmark at exact 50vh centre no matter the viewport width.
  ----------------------------------------------------------------- */
  useEffect(() => {
    function measure() {
      if (!wordmarkRef.current) return
      const h = wordmarkRef.current.offsetHeight
      if (h > 0) {
        setWordmarkHalf((prev) => (Math.abs(h / 2 - prev) > 1 ? h / 2 : prev))
      }
    }
    measure()
    const t1 = window.setTimeout(measure, 80)   // catches image load
    const t2 = window.setTimeout(measure, 300)  // fallback for slower fetch
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', measure)
    }
  }, [])

  /* -----------------------------------------------------------------
     STAGE 1 — fog interaction (desktop only). Skips to fully-cleared
     on mobile / reduced-motion.
  ----------------------------------------------------------------- */
  useEffect(() => {
    const cover  = document.getElementById('cover')
    const fog    = fogRef.current
    const cursor = cursorRef.current
    const hint   = hintRef.current
    if (!cover || !fog || !cursor || !hint) return

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 900px)').matches

    if (reduced || isMobile) {
      fog.style.opacity = '0'
      setFogCleared(true)
      setContentRevealed(true)
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
          setFogCleared(true)
        }
      }
    }

    function onLeave() { cursor!.style.opacity = '0' }
    function onEnter() { cursor!.style.opacity = '1' }

    cover.addEventListener('mousemove',  onMove)
    cover.addEventListener('mouseleave', onLeave)
    cover.addEventListener('mouseenter', onEnter)
    return () => {
      cover.removeEventListener('mousemove',  onMove)
      cover.removeEventListener('mouseleave', onLeave)
      cover.removeEventListener('mouseenter', onEnter)
    }
  }, [setMask])

  /* -----------------------------------------------------------------
     STAGE 3 — after fogCleared, the NEXT mousemove / scroll fades in
     the tagline block. 450ms guard so the gesture that cleared the
     fog doesn't immediately fire it.
  ----------------------------------------------------------------- */
  useEffect(() => {
    if (!fogCleared || contentRevealed) return

    let armed = false
    const trigger = () => {
      if (!armed) return
      setContentRevealed(true)
    }
    const armTimer = window.setTimeout(() => { armed = true }, 450)

    window.addEventListener('mousemove', trigger, { passive: true })
    window.addEventListener('scroll',    trigger, { passive: true })
    return () => {
      window.clearTimeout(armTimer)
      window.removeEventListener('mousemove', trigger)
      window.removeEventListener('scroll',    trigger)
    }
  }, [fogCleared, contentRevealed])

  /* -----------------------------------------------------------------
     Mobile 3-line overlay scroll trigger (unchanged)
  ----------------------------------------------------------------- */
  useEffect(() => {
    const lines = Array.from(document.querySelectorAll<HTMLElement>('.cover-mobile-line'))
    if (!lines.length) return
    function onScroll() {
      const vh = window.innerHeight
      const y  = window.scrollY
      lines.forEach((line, i) => {
        const threshold = vh * (0.04 + i * 0.08)
        if (y > threshold) line.classList.add('is-revealed')
        else               line.classList.remove('is-revealed')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const revealTransition = 'opacity 700ms cubic-bezier(0.22,0.61,0.36,1), transform 700ms cubic-bezier(0.22,0.61,0.36,1)'

  return (
    <section
      id="cover"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#2a2522',
        overflow: 'visible',
        cursor: 'none',
      }}
    >
      {/* Background image + dark overlay — span the whole (potentially
          taller-than-100vh) cover. */}
      <Image
        src="/images/logotype-brown-stone-bg.png"
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
        aria-hidden
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(27,25,24,0.55), rgba(27,25,24,0.35) 50%, rgba(27,25,24,0.6))',
          pointerEvents: 'none',
        }}
      />

      {/* Single centred flex column — wordmark → eyebrow → tagline.
          All three rows share a 22px gap so the vertical rhythm reads
          the same from top to bottom. */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 22,
        maxWidth: 1200,
        width: '100%',
        margin: '0 auto',
        padding: `calc(50vh - ${wordmarkHalf}px) 32px 160px`,
        boxSizing: 'border-box',
        minHeight: '100vh',
      }}>
        {/* Wordmark — measurement target */}
        <div ref={wordmarkRef} style={{ maxWidth: '720px', width: '58%', lineHeight: 0 }}>
          <Image
            src="/images/logotype-stone.png"
            alt="The Human Club"
            width={920}
            height={300}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>

        {/* Eyebrow — Stage 2 (fogCleared) */}
        <span
          className="cover-eyebrow"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--shell)',
            textAlign: 'center',
            opacity:   fogCleared ? 0.92 : 0,
            transform: fogCleared ? 'translateY(0)' : 'translateY(8px)',
            transition: revealTransition,
          }}
        >
          A Creative Collective Agency
        </span>

        {/* Tagline block — Stage 3 (contentRevealed). Sits at the same
            22px gap under the eyebrow as the eyebrow sits under the
            wordmark. */}
        <div
          className="cover-desktop-tagline"
          style={{
            maxWidth: 640,
            color: 'var(--shell)',
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            lineHeight: 1.55,
            textAlign: 'center',
            opacity:   contentRevealed ? 0.92 : 0,
            transform: contentRevealed ? 'translateY(0)' : 'translateY(20px)',
            transition: revealTransition,
          }}
        >
          <strong style={{ display: 'block', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--shell)' }}>
            Housing multidisciplinary creatives.
          </strong>

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

          <div style={{ marginTop: 36 }}>
            The Human Club also welcomes you to our audio experiences:{' '}
            <strong style={{ color: 'var(--chartreuse)', fontWeight: 700 }}>
              The Human Club Podcast &amp; T.H.C Radio.
            </strong>
          </div>

          <em style={{ display: 'block', marginTop: 20, fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--shell)', opacity: 0.85 }}>
            Offering private social media consultancy for influencers.
          </em>

          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--chartreuse)',
                animation: 'cover-dot-pulse 2.4s cubic-bezier(0.22,0.61,0.36,1) infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile 3-line overlay — unchanged */}
      <div className="cover-mobile-overlay" aria-hidden>
        <span className="cover-mobile-line">Built for humans.</span>
        <span className="cover-mobile-line">Run by humans.</span>
        <span className="cover-mobile-line">Created for humans.</span>
      </div>

      {/* Working from — anchored to bottom-right of the FIRST viewport.
          Fades in with Stage 2 (fogCleared). */}
      <div
        className="cover-desktop-workingfrom"
        style={{
          position: 'absolute',
          right: 32,
          top: 'calc(100vh - 28px)',
          transform: 'translateY(-100%)',
          zIndex: 6,
          textAlign: 'right',
          maxWidth: 320,
          color: 'var(--shell)',
          fontFamily: 'var(--font-ui)',
          fontSize: '12px',
          lineHeight: 1.55,
          opacity:    fogCleared ? 0.72 : 0,
          transition: 'opacity 700ms cubic-bezier(0.22,0.61,0.36,1)',
        }}
      >
        <strong style={{ display: 'block', color: 'var(--shell)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '10px', marginBottom: 4 }}>
          — Working from
        </strong>
        Berlin &amp; Cape Town<br />Partnering worldwide.
      </div>

      {/* Fog hint — anchored to first-viewport bottom */}
      <div
        ref={hintRef}
        className="cover-fog-hint"
        style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(100vh - 32px)',
          transform: 'translate(-50%, -100%)',
          zIndex: 6,
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '10px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(232,223,207,0.55)', transition: 'opacity 600ms',
        }}
      >
        — Move your cursor to clear the fog
      </div>

      {/* Fog overlay — constrained to first viewport */}
      <div
        ref={fogRef}
        aria-hidden
        className="cover-fog"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '100vh', minHeight: '720px',
          zIndex: 5,
          pointerEvents: 'none',
          backdropFilter: 'blur(28px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.1)',
          background: 'rgba(232,223,207,0.22)',
          transition: 'opacity 1400ms cubic-bezier(0.22,0.61,0.36,1)',
          WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 30%, black 100%)',
          maskImage:       'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 30%, black 100%)',
        }}
      />

      {/* Cursor dot */}
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

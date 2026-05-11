'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function Cover() {
  const fogRef    = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const hintRef   = useRef<HTMLDivElement>(null)
  const builtRef  = useRef<HTMLDivElement>(null)
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
   * Mobile-only scroll trigger — once the user scrolls more than ~12%
   * down the cover the "BUILT FOR HUMANS, RUN BY HUMANS." overlay fades
   * in. We listen on scroll instead of using IntersectionObserver
   * because the overlay starts inside the viewport (it's the whole
   * landing) — we want the reveal to fire as the user starts moving,
   * not just on initial intersection.
   */
  useEffect(() => {
    const built = builtRef.current
    if (!built) return
    function onScroll() {
      const trigger = window.innerHeight * 0.12
      if (window.scrollY > trigger) built!.classList.add('is-revealed')
      else                          built!.classList.remove('is-revealed')
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
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

      {/* Wordmark */}
      <Image
        src="/images/logotype-stone.png"
        alt="The Human Club"
        width={920}
        height={300}
        style={{ maxWidth: '920px', width: '70%', position: 'relative', zIndex: 2 }}
        priority
      />

      {/* Mobile-only scroll-trigger overlay — fades in once the user
          starts scrolling, centred on screen. Hidden on desktop via the
          cover-mobile-overlay rule in globals.css. */}
      <div ref={builtRef} className="cover-mobile-overlay" aria-hidden>
        <span className="built">Built for humans,<br />run by humans.</span>
      </div>

      {/* Bottom bar — desktop only. Hidden on mobile (replaced by the
          scroll-triggered overlay above). */}
      <div className="cover-desktop-tagline" style={{
        position: 'absolute', left: 32, right: 32, bottom: 28, zIndex: 6,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        color: 'var(--shell)', fontFamily: 'var(--font-ui)', fontSize: '12px', lineHeight: 1.55,
      }}>
        <div style={{ maxWidth: 540, opacity: 0.92 }}>
          {/* Eyebrow */}
          <strong style={{ display: 'block', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--shell)', marginBottom: 14 }}>
            Built for humans, run by humans.
          </strong>

          {/* Body paragraph — opening sentence bolded per latest desktop tweak,
              rest of the prose stays exactly as it was before. */}
          <strong style={{ fontWeight: 700, color: 'var(--shell)' }}>
            The Human Club is a 360-degree creative agency.
          </strong>{' '}
          We take the brief from start to finish, representing incredible talent within the scene —{' '}
          <em style={{ color: 'var(--chartreuse)', fontStyle: 'italic', fontWeight: 400 }}>
            Humans Of Influence, Artists, Musicians, User Generated Content Creators and Experience Designers.
          </em>

          <br /><br />

          {/* Audio-experiences line — single sentence, product names bolded
              + chartreuse so the two offerings stand out. */}
          The Human Club also welcomes you to our audio experiences:{' '}
          <strong style={{ color: 'var(--chartreuse)', fontWeight: 700 }}>
            The Human Club Podcast &amp; T.H.C Radio.
          </strong>

          {/* Offering line — restyled to lowercase italic. */}
          <em style={{ display: 'block', marginTop: 14, fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--shell)', opacity: 0.85 }}>
            Offering private social media consultancy.
          </em>
        </div>
        <div style={{ textAlign: 'right', opacity: 0.72, maxWidth: 320 }}>
          <strong style={{ display: 'block', color: 'var(--shell)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '10px', marginBottom: 4 }}>
            — Working from
          </strong>
          Berlin &amp; Cape Town<br />Partnering worldwide.
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 70, transform: 'translateX(-50%)',
        zIndex: 6, fontFamily: 'var(--font-ui)', fontWeight: 700,
        fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
        color: 'rgba(232,223,207,0.7)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ width: 60, height: 1, background: 'currentColor', position: 'relative', overflow: 'hidden', display: 'block' }}>
          <span style={{
            position: 'absolute', left: '-40%', top: 0, bottom: 0, width: '40%',
            background: 'var(--chartreuse)',
            animation: 'sweep 2.4s cubic-bezier(0.76,0,0.24,1) infinite',
          }} />
        </span>
      </div>

      {/* Fog hint */}
      <div
        ref={hintRef}
        style={{
          position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)',
          zIndex: 6, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '10px',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(232,223,207,0.55)', transition: 'opacity 600ms',
        }}
      >
        — Move your cursor to clear the fog
      </div>

      {/* Fog overlay */}
      <div
        ref={fogRef}
        aria-hidden
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

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        aria-hidden
        className="hidden tablet:block"
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

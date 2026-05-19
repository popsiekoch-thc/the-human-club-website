'use client'

import { useEffect, useRef } from 'react'

/**
 * Mobile-only landing body text — fades in as the user scrolls past
 * the cover. Sits between <Cover /> and <Roster /> in the page tree;
 * hidden on desktop via `.mobile-landing-tagline { display: none }`
 * (toggled to block at the 900px breakpoint in globals.css).
 *
 * Each .mlt-block fades up once 25% of it is on-screen.
 */
export default function MobileLandingTagline() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.mlt-block'))

    if (typeof IntersectionObserver === 'undefined') {
      blocks.forEach((b) => b.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )
    blocks.forEach((b) => io.observe(b))
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      className="mobile-landing-tagline"
      aria-label="The Human Club — about"
    >
      <div className="mlt-block">
        <p>
          <strong>The Human Club is a Creative collective. Housing Multi-disciplinary creatives:</strong>{' '}
          <em>
            Sound Designers, Videographers, Photographers, User Generated Content Creators, Musicians and Experience designers.
          </em>
        </p>
      </div>

      <div className="mlt-block">
        <p>
          The Human Club also welcomes you to our audio experiences:{' '}
          <strong className="mlt-green">The Human Club Podcast &amp; T.H.C Radio.</strong>
        </p>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'

/**
 * Mobile-only landing scroll flow.
 *
 * Sits in the page tree between <Cover /> and <Roster />. Hidden on
 * desktop via `.mobile-landing-flow { display: none }` (toggled to flex
 * at the 900px breakpoint in globals.css).
 *
 * Each .mlf-block fades up as it scrolls into view. We use a single
 * IntersectionObserver to add `.is-revealed` once at least ~25% of a
 * block is on-screen. Re-revealing on scroll-back is intentionally
 * suppressed (the class stays on) so the flow doesn't flicker if a
 * user scrolls up.
 */
export default function MobileLandingFlow() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.mlf-block'))

    // If IntersectionObserver isn't available, just show everything.
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
    <section ref={rootRef} className="mobile-landing-flow" aria-label="The Human Club — intro">
      <div className="mlf-block mlf-headline">
        <h2 className="mlf-headline-text">
          Built for humans<br />run by humans.
        </h2>
      </div>

      <div className="mlf-block">
        <p className="mlf-body">
          The Human Club is a 360-degree creative agency. We take the brief from start to finish, representing incredible talent within the scene —{' '}
          <em>Humans Of Influence, Artists, Musicians, User Generated Content Creators and Experience Designers.</em>
        </p>
      </div>

      <div className="mlf-block">
        <p className="mlf-lead">The Human Club also welcomes you to our audio experiences:</p>
        <p className="mlf-green">The Human Club Podcast &amp; T.H.C Radio.</p>
      </div>

      <div className="mlf-block">
        <p className="mlf-offering">offering private social media consultancy.</p>
      </div>
    </section>
  )
}

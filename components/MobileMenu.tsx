'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Cover',     href: '#cover'     },
  { label: 'Creatives', href: '#creatives' },
  { label: 'Music',     href: '#music'     },
  { label: 'Podcast',   href: '#podcast'   },
  { label: 'THC Radio', href: '#radio'     },
]

/**
 * Fixed hamburger menu used on mobile (display toggled via CSS at the
 * 900px breakpoint). The button lives at the top centre of the nav bar
 * and stays visible throughout the entire site.
 *
 * Behaviour:
 *  • Tap the hamburger → drawer slides in (full-screen overlay).
 *  • Tap a link or the close affordance → drawer closes, then the
 *    anchor scrolls into view (we let the browser handle the actual
 *    scroll; closing first avoids overlay-blocking-click jank).
 *  • Body scroll is locked while the drawer is open.
 *  • Escape key closes the drawer.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="nav-hamburger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="bars" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id="mobile-nav-drawer"
        className={`nav-drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <div className="drawer-foot">— The Human Club</div>
      </div>
    </>
  )
}

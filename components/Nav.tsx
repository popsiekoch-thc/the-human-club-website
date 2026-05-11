'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
  /**
   * Once the user has scrolled past the landing cover, we drop a
   * 50%-opacity grey backdrop behind the nav so it stops clashing with the
   * section content underneath. Threshold = (cover height − 80px) so the
   * transition triggers just before the nav crosses the cover boundary.
   */
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      const cover = document.getElementById('cover')
      const threshold = (cover?.offsetHeight ?? 700) - 80
      setScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background:        scrolled ? 'rgba(45, 39, 38, 0.5)' : 'transparent',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.1)' : 'none',
        backdropFilter:    scrolled ? 'blur(12px) saturate(1.1)' : 'none',
        borderBottom:      scrolled ? '1px solid rgba(225,225,213,0.18)' : '1px solid transparent',
        color:             'var(--shell)',
        transition:        'background 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: '18px 32px', gap: '40px' }}>
        {/* Logo — always stone variant since every section sits on a dark ground */}
        <a href="#cover" aria-label="The Human Club — home" style={{ display: 'block', lineHeight: 0 }}>
          <Image
            src="/images/logo-lockup-stone.png"
            alt="The Human Club"
            width={160}
            height={50}
            style={{ height: '50px', width: 'auto' }}
            priority
          />
        </a>

        <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }} className="hidden tablet:flex">
          {[
            { label: 'Creatives', href: '#creatives' },
            { label: 'Music',     href: '#music'     },
            { label: 'Podcast',   href: '#podcast'   },
            { label: 'THC Radio', href: '#radio'     },
          ].map(({ label, href }) => (
            <a key={href} href={href} className="nav-link"
               style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'inherit', padding: '6px 0' }}>
              {label}
            </a>
          ))}
        </div>

        <NavCTA />
      </div>
    </nav>
  )
}

function NavCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="mailto:popsiekoch@thehumanclub.world"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        border: '1px solid currentColor', padding: '9px 16px', borderRadius: 999,
        fontFamily: 'var(--font-ui)', fontWeight: 700,
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        transition: 'background 240ms, color 240ms',
        background: hovered ? 'var(--shell)' : 'transparent',
        color:      hovered ? 'var(--ink)'   : 'inherit',
      }}
    >
      Let&apos;s talk →
    </a>
  )
}

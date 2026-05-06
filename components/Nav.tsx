'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
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
        background:   scrolled ? 'var(--shell)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        color:        scrolled ? 'var(--ink)'   : 'var(--shell)',
        transition: 'background 320ms ease, border-color 320ms ease, color 320ms ease',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', padding: '18px 32px', gap: '40px' }}>
        {/* Logo */}
        <a href="#cover" aria-label="The Human Club — home" style={{ display: 'block', lineHeight: 0 }}>
          <Image
            src={scrolled ? '/images/logo-lockup-black.png' : '/images/logo-lockup-stone.png'}
            alt="The Human Club"
            width={160}
            height={50}
            style={{ height: '50px', width: 'auto' }}
            priority
          />
        </a>

        {/* Nav links — hidden below 900px */}
        <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }} className="hidden tablet:flex">
          {[
            { label: 'Roster',    href: '#roster'  },
            { label: 'Music',     href: '#music'   },
            { label: 'Podcast',   href: '#podcast' },
            { label: 'THC Radio', href: '#radio'   },
          ].map(({ label, href }) => (
            <a key={href} href={href} className="nav-link"
               style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'inherit', padding: '6px 0' }}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <NavCTA scrolled={scrolled} />
      </div>
    </nav>
  )
}

function NavCTA({ scrolled }: { scrolled: boolean }) {
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
        background: hovered ? (scrolled ? 'var(--ink)' : 'var(--shell)') : 'transparent',
        color:      hovered ? (scrolled ? 'var(--shell)' : 'var(--ink)') : 'inherit',
      }}
    >
      Let&apos;s talk →
    </a>
  )
}

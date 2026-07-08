export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '80px clamp(20px, 5vw, 40px) 36px',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="footer-hello" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(56px, 10vw, 156px)', lineHeight: 0.88, letterSpacing: '-0.04em', margin: '0 0 44px', color: 'var(--shell)', paddingTop: 56, borderTop: '1px solid rgba(225,225,213,0.4)' }}>
          Say&nbsp;hello,<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--chartreuse)' }}>talk soon.</em>
        </h2>

        <div
          className="footer-cols"
          style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, paddingTop: 36, borderTop: '1px solid rgba(225,225,213,0.18)' }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px', color: 'rgba(225,225,213,0.6)' }}>
              — The Human Club
            </h4>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, margin: 0, color: 'var(--shell)' }}>
              A creative social-media agency — humans, podcasts, radio &amp; event experiences.<br />
              Berlin &amp; Cape Town · est. 2025.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px', color: 'rgba(225,225,213,0.6)' }}>
              — Sections
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[['#creatives', 'Creatives'], ['#music', 'Music & Artists'], ['#podcast', 'Podcast'], ['#radio', 'THC Radio']].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px', color: 'rgba(225,225,213,0.6)' }}>
              — Contact
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li><a href="mailto:popsiekoch@thehumanclub.world" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>popsiekoch@thehumanclub.world</a></li>
              <li><a href="tel:+4917641100454" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>+49 176 4110 0454</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px', color: 'rgba(225,225,213,0.6)' }}>
              — Follow
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                ['https://www.instagram.com/thehumanc.lub_/',                                'Instagram'],
                ['https://www.youtube.com/@TheHumanClub_Podcast',                            'YouTube'],
                ['https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489', 'Apple Podcasts'],
                ['https://soundcloud.com/thehumanclubradio',                                  'SoundCloud'],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-legal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, paddingTop: 50, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(225,225,213,0.55)' }}>
          <div>© 2026 The Human Club</div>
          <div>Human by nature · Creative by design</div>
          <div>Berlin (HQ) &amp; Cape Town</div>
        </div>
      </div>
    </footer>
  )
}

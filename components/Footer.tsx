/**
 * Footer — centred, stacked, no repetition.
 *
 * Order requested by the client:
 *   1. The Human Club          (tagline)
 *   2. Contact                 (email + phone)
 *   3. Follow                  (social links)
 *   4. Berlin & Cape Town
 *   5. Partnering Worldwide
 *   6. Est. 2025
 *
 * The previous "Sections" column duplicated the nav, and the long
 * "A Creative Agency Housing: …" line repeated the tagline — both
 * removed.
 */
const SOCIALS: [string, string][] = [
  ['https://www.instagram.com/thehumanc.lub_/',                                          'Instagram'],
  ['https://www.youtube.com/@TheHumanClub_Podcast',                                       'YouTube'],
  ['https://podcasts.apple.com/de/podcast/the-human-club-podcast/id1887355489',          'Apple Podcasts'],
  ['https://soundcloud.com/thehumanclubradio',                                            'SoundCloud'],
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '80px 40px 36px',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <h2 className="footer-hello" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(56px, 10vw, 156px)', lineHeight: 0.88, letterSpacing: '-0.04em', margin: '0 0 56px', color: 'var(--shell)', paddingTop: 56, borderTop: '1px solid rgba(225,225,213,0.4)' }}>
          Say&nbsp;hello,<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--chartreuse)' }}>talk soon.</em>
        </h2>

        {/* Stacked content blocks — centred, single column. */}
        <div
          className="footer-cols"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 36,
            paddingTop: 36,
            borderTop: '1px solid rgba(225,225,213,0.18)',
            alignItems: 'center',
          }}
        >
          {/* 1 — The Human Club */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 10px', color: 'rgba(225,225,213,0.6)' }}>
              — The Human Club
            </h4>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, margin: 0, color: 'var(--shell)' }}>
              A creative social-media agency — humans, podcasts, radio &amp; event experiences.
            </p>
          </div>

          {/* 2 — Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 10px', color: 'rgba(225,225,213,0.6)' }}>
              — Contact
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><a href="mailto:popsiekoch@thehumanclub.world" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>popsiekoch@thehumanclub.world</a></li>
              <li><a href="tel:+4917641100454" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>+49 176 4110 0454</a></li>
            </ul>
          </div>

          {/* 3 — Follow */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 10px', color: 'rgba(225,225,213,0.6)' }}>
              — Follow
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {SOCIALS.map(([href, label]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, color: 'var(--shell)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4–6 — Bottom legal strip: three short lines, centred and stacked. */}
        <div className="footer-legal" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          paddingTop: 50,
          fontFamily: 'var(--font-ui)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(225,225,213,0.6)',
        }}>
          <div>Berlin &amp; Cape Town</div>
          <div>Partnering Worldwide</div>
          <div>Est. 2025</div>
        </div>
      </div>
    </footer>
  )
}

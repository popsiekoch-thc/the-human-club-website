'use client'

const ROSTER = [
  {
    initial: 'A', name: 'Alex Kibb', handle: '@alexkibb', shortName: 'Alex',
    role: '— Photographer · Videographer',
    bio: 'A photographer and videographer who specialises in fashion, outdoor / adventure and product content. Equally comfortable shooting stills or motion — takes a campaign from concept to delivery, ready for social and brand campaigns.',
    ig: 'https://www.instagram.com/alexkibb/',
    link: 'https://alexkibb.com/', linkLabel: 'Website',
  },
  {
    initial: 'J', name: "Jamila O'Donnell", handle: '@jamilaodonnell_', shortName: 'Jamila',
    role: '— Experience Designer · Chef · Lifestyle Model',
    bio: 'South African-born, Berlin-based model, lifestyle creator and chef — and the founder of Studio Jamila. Fashion, food and lifestyle content that feels genuinely lived-in. The right partner for brands looking for influence with real substance behind it.',
    ig: 'https://www.instagram.com/jamilaodonnell_/',
    link: 'https://www.tiktok.com/@jamilaodonnell_', linkLabel: 'TikTok',
  },
  {
    initial: 'M', name: 'Moise', handle: '@moiseymb', shortName: 'Moise',
    role: '— Director · Photographer',
    bio: 'A director and photographer with a strong focus on fashion editorial, portraiture and narrative-driven imagery. Brings full creative direction to every project — the go-to for brands that need a single creative to own the look and feel of a campaign from start to finish.',
    ig: 'https://www.instagram.com/moiseymb/',
    link: 'https://www.tiktok.com/@moiseymb', linkLabel: 'TikTok',
  },
  {
    initial: 'T', name: 'Thor Rixon', handle: '@thorrixon', shortName: 'Thor',
    role: '— Sound Designer · Videographer',
    bio: 'Videographer and sound designer creating content rooted in music, performance and live culture. The unique ability to handle both the visual and audio sides makes him a powerful choice for brands wanting immersive, music-led campaigns or event content that feels as good as it looks.',
    ig: 'https://www.instagram.com/thorrixon/',
    link: 'https://www.tiktok.com/@thorrixon', linkLabel: 'TikTok',
  },
  {
    initial: 'V', name: 'Victoria Cliffe', handle: '@victoria.cliffe', shortName: 'Victoria',
    role: '— Director · Videographer · Editor',
    bio: 'Director, videographer and editor specialising in fashion film, editorial content and brand storytelling. Handles the full pipeline — directing, shooting and editing — turning around polished, platform-ready video content efficiently for Reels, TikTok or YouTube.',
    ig: 'https://www.instagram.com/victoriacliffe.films/',
    link: 'https://www.tiktok.com/@victoria.cliffe', linkLabel: 'TikTok',
  },
  {
    initial: 'W', name: 'WezLew', handle: '@wezlew', shortName: 'Wez',
    role: '— Creative Director · Analog Photographer · AI',
    bio: 'Cape Town–based creative director and analog photographer travelling the world and shooting the light through his eyes. Wez is also highly advanced when it comes to AI creation and directing brand partnerships outside of his swimwear niche.',
    ig: 'https://www.instagram.com/wezlew/',
    link: 'https://www.wezlew.com/', linkLabel: 'Website',
  },
]

const FRAME_COLORS = [
  'var(--ink)', 'var(--sky)', 'var(--chartreuse)', 'var(--orange)', 'var(--burgundy)', 'var(--tobacco)',
]

export default function Roster() {
  return (
    <section
      id="roster"
      style={{ background: 'var(--cream)', color: 'var(--ink)', padding: '0 40px 100px', scrollMarginTop: 76 }}
    >
      <div className="section-head" style={{ borderTopColor: 'var(--border)' }}>
        <div className="num">— Page 01 / The Agency</div>
        <h2>The&nbsp;<em>Roster.</em></h2>
        <div className="aside">Photographers, directors and creators we represent across Berlin and Cape Town.</div>
      </div>

      <div
        className="roster-grid"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 32px',
          marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)',
        }}
      >
        {ROSTER.map((t, i) => (
          <article
            key={t.handle}
            className="talent-grid"
            style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: '18px 0' }}
          >
            {/* Reel frame placeholder */}
            <div style={{
              aspectRatio: '4/5',
              background: FRAME_COLORS[i % FRAME_COLORS.length],
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <span style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 100, color: 'rgba(232,223,207,0.18)', letterSpacing: '-0.04em',
                background: 'repeating-linear-gradient(45deg, rgba(232,223,207,0.04) 0 2px, transparent 2px 22px)',
              }}>{t.initial}</span>
              <span style={{ position: 'absolute', left: 12, top: 12, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.78)', zIndex: 2 }}>
                — Reel
              </span>
              <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 56, height: 56, borderRadius: '50%', background: 'var(--chartreuse)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 2 }}>
                ▶
              </span>
              <span style={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,223,207,0.7)', zIndex: 2 }}>
                <span>{t.shortName}</span><span>{t.handle}</span>
              </span>
            </div>

            {/* Info */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 10px', color: 'var(--ink)' }}>
                {t.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(27,25,24,0.6)', marginBottom: 12 }}>
                {t.role}
              </div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, lineHeight: 1.55, margin: '0 0 14px', maxWidth: 480, color: 'rgba(27,25,24,0.85)' }}>
                {t.bio}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={t.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talent-ig-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--ink)', color: 'var(--cream)', padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  Instagram →
                </a>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talent-alt-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--ink)', color: 'var(--cream)', border: '1px solid var(--ink)', padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  {t.linkLabel} →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

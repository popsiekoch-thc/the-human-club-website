/* Server component — three SoundCloud players stacked, no extra UI. */

type Mix = {
  id:    string  // SoundCloud track id
  color: string  // hex without leading '#'
  title: string
}

const MIXES: Mix[] = [
  { id: '2310193364', color: '673818', title: 'T.H.C Radio: Launch Event / Alle Anders' },
  { id: '2253969920', color: '673818', title: 'Aaron Zeederberg — Plae · Dub Dayz @ Bodega' },
  { id: '2282268668', color: '848464', title: 'Popsie & Sav @ The Soma Boma ✦ Pandora Nexus 2026' },
]

const SC_PARAMS =
  '&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
const SC_PROFILE = 'https://soundcloud.com/thehumanclubradio'

function buildSrc(mix: Mix): string {
  const trackUrl = `https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${mix.id}`
  return `https://w.soundcloud.com/player/?url=${trackUrl}&color=%23${mix.color}&auto_play=false${SC_PARAMS}`
}

export default function RadioPlayer() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
        {MIXES.map((mix) => (
          <div
            key={mix.id}
            style={{
              border: '1px solid rgba(225,225,213,0.18)',
              background: 'rgba(0,0,0,0.5)',
            }}
          >
            <iframe
              src={buildSrc(mix)}
              width="100%"
              height={300}
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media; clipboard-write"
              title={mix.title}
              style={{ display: 'block', border: 0 }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 24 }}>
        <a
          href={SC_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            borderBottom: '1px solid currentColor',
            color: 'var(--shell)',
          }}
        >
          Open the full SoundCloud ↗
        </a>
      </div>
    </div>
  )
}

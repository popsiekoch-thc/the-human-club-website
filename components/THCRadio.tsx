import RadioPlayer from './RadioPlayer'

export default function THCRadio() {
  return (
    <section
      id="radio"
      className="on-dark"
      style={{
        position: 'relative',
        background: '#2a2522 url("/images/logotype-brown-stone-bg.png") center/cover no-repeat',
        color: 'var(--shell)',
        padding: '0 40px 100px',
        scrollMarginTop: 76,
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(27,25,24,0.55)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-head" style={{ borderTopColor: 'rgba(225,225,213,0.25)' }}>
          <div className="num" style={{ color: 'var(--shell)' }}>— Page 04 / Radio</div>
          <h2 style={{ color: 'var(--shell)' }}>
            <span style={{ color: 'var(--shell)' }}>T.H.C</span>&nbsp;
            <em style={{ color: 'var(--chartreuse)', fontStyle: 'italic', fontWeight: 400 }}>Radio.</em>
          </h2>
          <div className="aside" style={{ color: 'rgba(225,225,213,0.75)' }}>
            Reposted mixes from the artists on the roster — straight from our SoundCloud.
          </div>
        </div>

        <RadioPlayer />
      </div>
    </section>
  )
}

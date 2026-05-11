import Nav                from '@/components/Nav'
import Cover              from '@/components/Cover'
import MobileLandingFlow  from '@/components/MobileLandingFlow'
import Roster             from '@/components/Roster'
import MusicArtists       from '@/components/MusicArtists'
import Podcast            from '@/components/Podcast'
import THCRadio           from '@/components/THCRadio'
import Footer             from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Cover />
      {/* Mobile-only: scroll-triggered tagline flow that picks up where
          the cover wordmark ends. Hidden on desktop via CSS. */}
      <MobileLandingFlow />
      <Roster />
      <MusicArtists />
      <Podcast />
      <THCRadio />
      <Footer />
    </>
  )
}

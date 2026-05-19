import Nav                  from '@/components/Nav'
import Cover                from '@/components/Cover'
import MobileLandingTagline from '@/components/MobileLandingTagline'
import Roster               from '@/components/Roster'
import MusicArtists         from '@/components/MusicArtists'
import Podcast              from '@/components/Podcast'
import THCRadio             from '@/components/THCRadio'
import Footer               from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Cover />
      {/* Mobile-only: body text continues the cover narrative as the
          user scrolls. Hidden on desktop via CSS. */}
      <MobileLandingTagline />
      <Roster />
      <MusicArtists />
      <Podcast />
      <THCRadio />
      <Footer />
    </>
  )
}

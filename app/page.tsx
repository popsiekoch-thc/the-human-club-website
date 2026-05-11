import Nav          from '@/components/Nav'
import Cover        from '@/components/Cover'
import Roster       from '@/components/Roster'
import MusicArtists from '@/components/MusicArtists'
import Podcast      from '@/components/Podcast'
import THCRadio     from '@/components/THCRadio'
import Footer       from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Cover />
      <Roster />
      <MusicArtists />
      <Podcast />
      <THCRadio />
      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const mytupi = localFont({
  src: [
    { path: '../public/fonts/Mytupi-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Mytupi-Bold.ttf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-mytupi',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thehumanclub.agency'),
  title: 'The Human Club — Human by nature. Creative by design.',
  description:
    'A creative social-media agency representing UGC creators, influencers, podcasters and live-experience curators. Based in Berlin & Cape Town.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Human Club',
    description: 'Human by nature. Creative by design.',
    siteName: 'The Human Club',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mytupi.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yjk1ckf.css" />
      </head>
      <body style={{ fontFamily: 'var(--font-ui)' }}>{children}</body>
    </html>
  )
}

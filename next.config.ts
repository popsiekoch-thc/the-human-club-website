import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'image.mux.com' },
      { hostname: 'cdn.sanity.io' },
      { hostname: 'is1-ssl.mzstatic.com' },
      { hostname: 'is2-ssl.mzstatic.com' },
      { hostname: 'is3-ssl.mzstatic.com' },
      { hostname: 'is4-ssl.mzstatic.com' },
      { hostname: 'is5-ssl.mzstatic.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'thehumanclub.world' }],
        destination: 'https://www.thehumanclub.agency/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.thehumanclub.world' }],
        destination: 'https://www.thehumanclub.agency/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

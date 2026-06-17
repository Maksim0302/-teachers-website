import { fileURLToPath } from 'url'
import { dirname } from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default createNextIntlPlugin('./i18n.js')({
  turbopack: {
    root: __dirname,
  },
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['sanity', 'next-sanity'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
})

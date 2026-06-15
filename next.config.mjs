import { fileURLToPath } from 'url'
import { dirname } from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default createNextIntlPlugin('./i18n.js')({
  turbopack: {
    root: __dirname,
  },
})

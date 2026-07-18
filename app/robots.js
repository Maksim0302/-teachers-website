import { siteUrl } from './lib/seo'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}

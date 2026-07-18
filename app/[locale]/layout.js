import '../globals.scss'
import SiteDocument from '../components/SiteDocument/SiteDocument'
import { siteUrl, locales, localizedPath } from '../lib/seo'

export const metadata = {
  metadataBase: siteUrl,
  title: { default: 'Educational Portal', template: '%s | Educational Portal' },
  robots: { index: true, follow: true },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  return <SiteDocument locale={locale || 'en'}>{children}</SiteDocument>
}

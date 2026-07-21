import '../globals.scss'
import SiteDocument from '../components/SiteDocument/SiteDocument'
import { siteUrl, locales } from '../lib/seo'

export const metadata = {
  metadataBase: siteUrl,
  title: { default: 'Iryna Bilyk - Teacher', template: '%s | Iryna Bilyk - Teacher' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/img/logo/logo_new.png',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  return <SiteDocument locale={locale || 'en'}>{children}</SiteDocument>
}

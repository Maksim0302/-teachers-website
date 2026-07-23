import '../globals.scss'
import SiteDocument from '../components/SiteDocument/SiteDocument'
import { locales } from '../lib/seo'
import { getSeoTranslation } from '../lib/seoTranslations'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const seo = getSeoTranslation(locale)

  return {
    title: { default: seo.title, template: `%s | ${seo.siteName}` },
    description: seo.description,
    applicationName: seo.applicationName,
    keywords: seo.keywords,
    openGraph: { siteName: seo.siteName, locale: { uk: 'uk_UA', ru: 'ru_RU', en: 'en_US' }[locale] || 'uk_UA' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params

  return <SiteDocument locale={locale || 'en'}>{children}</SiteDocument>
}

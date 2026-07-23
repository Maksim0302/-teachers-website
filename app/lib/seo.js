import { defaultLocale, locales } from './locales'
import { getPageSeoTranslation, getSeoTranslation } from './seoTranslations'

const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://bilyk-ira-teachers.vercel.app'

export const siteUrl = new URL(configuredUrl.endsWith('/') ? configuredUrl : `${configuredUrl}/`)
export { locales }

const openGraphLocales = { uk: 'uk_UA', ru: 'ru_RU', en: 'en_US' }

export function localizedPath(locale, path = '') {
  const normalizedPath = path && path !== '/' ? `/${path.replace(/^\/+/, '')}` : ''
  return `/${locale}${normalizedPath}`
}

export function createAlternates(locale, path = '') {
  return {
    canonical: localizedPath(locale, path),
    languages: Object.fromEntries(
      locales.map((language) => [language, localizedPath(language, path)])
    ),
    'x-default': localizedPath(defaultLocale, path),
  }
}

export function createPageMetadata({ locale, path = '', title, description, keywords = [], image }) {
  const translation = getSeoTranslation(locale)
  const pageTranslation = getPageSeoTranslation(locale, path)
  const pageTitle = title || pageTranslation?.title || translation.title
  const pageDescription = description || pageTranslation?.description || translation.description
  const canonical = localizedPath(locale, path)
  const imageUrl = image || '/img/logo/logo_new.png'

  return {
    title: pageTitle,
    description: pageDescription,
    applicationName: translation.applicationName,
    keywords: [...translation.keywords, ...keywords],
    alternates: createAlternates(locale, path),
    openGraph: {
      type: 'website',
      locale: openGraphLocales[locale] || openGraphLocales.uk,
      url: canonical,
      title: pageTitle,
      description: pageDescription,
      siteName: translation.siteName,
      images: [{ url: imageUrl, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  }
}

export function createContentMetadata({ locale, path, content, fallbackTitle, fallbackDescription, keywords = [] }) {
  const fallback = getPageSeoTranslation(locale, path)
  return createPageMetadata({
    locale,
    path,
    title: content?.title || fallback?.title || fallbackTitle,
    description: content?.subtitle || fallback?.description || fallbackDescription,
    keywords,
  })
}

export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function createSiteJsonLd(locale) {
  const seo = getSeoTranslation(locale)
  const localeUrl = new URL(localizedPath(locale), siteUrl).toString()
  const organizationId = `${siteUrl}#organization`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `${localeUrl}#website`,
        '@type': 'WebSite',
        name: seo.siteName,
        url: localeUrl,
        inLanguage: locale,
      },
      {
        '@id': organizationId,
        '@type': 'EducationalOrganization',
        name: 'Краснопільський ліцей',
        url: siteUrl.toString(),
        logo: new URL('/icon.png', siteUrl).toString(),
      },
      {
        '@id': `${siteUrl}#iryna-bilyk`,
        '@type': 'Person',
        name: 'Ірина Петрівна Білик',
        jobTitle: 'Учитель початкових класів',
        worksFor: { '@id': organizationId },
        url: siteUrl.toString(),
        image: new URL('/icon.png', siteUrl).toString(),
      },
    ],
  }
}

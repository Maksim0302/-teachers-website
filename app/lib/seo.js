const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const siteUrl = new URL(configuredUrl)
export const locales = ['uk', 'ru', 'en']

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
    'x-default': localizedPath('en', path),
  }
}

export function createPageMetadata({ locale, path = '', title, description, keywords = [], image }) {
  const canonical = localizedPath(locale, path)
  const imageUrl = image || '/img/logo/logo_new.png'

  return {
    title,
    description,
    keywords: ['вчитель', 'освітній сайт', 'навчальні матеріали', ...keywords],
    alternates: createAlternates(locale, path),
    openGraph: {
      type: 'website',
      locale: openGraphLocales[locale] || openGraphLocales.uk,
      url: canonical,
      title,
      description,
      siteName: 'Educational Portal',
      images: [{ url: imageUrl, width: 512, height: 512, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function createContentMetadata({ locale, path, content, fallbackTitle, fallbackDescription, keywords = [] }) {
  return createPageMetadata({
    locale,
    path,
    title: content?.title || fallbackTitle,
    description: content?.subtitle || fallbackDescription,
    keywords,
  })
}

export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

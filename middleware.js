import { NextResponse } from 'next/server'
import Negotiator from 'negotiator'

const supportedLocales = [
  'en',
  'da',
  'de',
  'es',
  'fr',
  'hr',
  'id',
  'it',
  'hu',
  'nl',
  'no',
  'pl',
  'pt',
  'ro',
  'fi',
  'sv',
  'vi',
  'tr',
  'cs',
  'el',
  'ru',
  'uk',
  'bg',
  'th',
  'ja',
  'zh',
  'ko',
  'he',
  'ar',
]

function getPreferredLocale(req) {
  // Сначала проверяем сохраненный язык в cookies
  const savedLocale = req.cookies.get('NEXT_LOCALE')?.value
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale
  }

  const negotiator = new Negotiator({
    headers: { 'accept-language': req.headers.get('accept-language') },
  })
  const preferredLanguages = negotiator.languages()

  for (const lang of preferredLanguages) {
    const baseLang = lang.split('-')[0]
    if (supportedLocales.includes(baseLang)) {
      return baseLang
    }
  }

  return 'en'
}

export function middleware(req) {
  const { pathname } = req.nextUrl

  // Check if pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const preferredLocale = getPreferredLocale(req)
    const newPathname =
      pathname === '/'
        ? `/${preferredLocale}/`
        : `/${preferredLocale}${pathname}`

    return NextResponse.redirect(new URL(newPathname, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
}

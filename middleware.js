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

  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(req)

    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, req.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/',
}

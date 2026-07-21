import { NextResponse } from 'next/server'
import { defaultLocale, locales } from './app/lib/locales'

export function proxy(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/studio')) return NextResponse.next()

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!pathnameHasLocale) {
    const localizedPath =
      pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
    return NextResponse.redirect(new URL(localizedPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
}

'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import './BackToHome.scss'

export default function BackToHome() {
  const pathname = usePathname() || '/'
  const t = useTranslations('BackToHome')

  // Extract locale from pathname
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  const locale = /^[a-z]{2}$/.test(maybeLocale) ? maybeLocale : null
  const homePath = locale ? `/${locale}` : '/'

  // Normalize pathname
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  // Check if we're on home page
  const isHome =
    normalizedPath === '/' || (locale && normalizedPath === `/${locale}`)

  // Don't render if on home page
  if (isHome) {
    return null
  }

  return (
    <div className="back-to__button">
      <div className="container">
        <div className="back-to-home">
          <Link href={homePath} className="back-to-home__link">
            <FiArrowLeft className="back-to-home__icon" />
            <span>{t('label')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

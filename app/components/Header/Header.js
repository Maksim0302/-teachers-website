'use client'
import React, { forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import LangSwitcher from '../LangSwitcher/LangSwitcher'
import './Header.scss'

const navItems = [
  { key: 'about-me', id: 'about-me' },
  // { key: 'home', id: null },
  { key: 'school-events', id: 'school-events' },
  { key: 'video-gallery', id: 'video-gallery' },
  { key: 'contact', id: 'contact' },
]

const Header = forwardRef((props, ref) => {
  const t = useTranslations('Header')
  const pathname = usePathname() || '/'

  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  const locale = /^[a-z]{2}$/.test(maybeLocale) ? maybeLocale : null
  const homePath = locale ? `/${locale}` : '/'

  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const isHome =
    normalizedPath === '/' || (locale && normalizedPath === `/${locale}`)

  return (
    <header ref={ref} className={`header${isHome ? '' : ' header--no-nav'}`}>
      <div className="container header__container">
        <div className="header__content">
          <Link href={homePath} className="logo" aria-label={t('logoAlt')}>
            <Image
              src="/img/logo/logo_new.png"
              width={70}
              height={70}
              alt={t('logoAlt')}
            />
          </Link>

          {isHome && (
            <div className="navigation">
              <nav className="navigation__menu" aria-label="Primary navigation">
                {navItems.map((item) => {
                  const label = t(`nav.${item.key}`)
                  const href = item.id === null ? homePath : `#${item.id}`

                  return (
                    <Link key={item.key} href={href} aria-current={item.id === null && isHome ? 'page' : undefined}>
                      {label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}

          <div className="header__actions">
            <LangSwitcher />
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header

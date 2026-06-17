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
  { key: 'home', id: null },
  { key: 'about', id: 'about' },
  { key: 'services', id: 'services' },
  { key: 'blog', id: 'blog' },
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
          <Link href={homePath} className="logo">
            <Image
              src="/img/logo/logo.jpg"
              width={70}
              height={70}
              alt={t('logoAlt')}
            />
          </Link>

          {isHome && (
            <div className="navigation">
              <nav className="navigation__menu">
                {navItems.map((item) => {
                  const label = t(`nav.${item.key}`)
                  const href = item.id === null ? homePath : `#${item.id}`

                  return (
                    <Link key={item.key} href={href}>
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

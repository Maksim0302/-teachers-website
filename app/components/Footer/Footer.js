'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { useLocale, useTranslations } from 'next-intl'
import './Footer.scss'

const sections = [
  { labelKey: 'pages.home', href: '#home' },
  { labelKey: 'pages.about', href: '/about' },
  { labelKey: 'pages.photoGallery', href: '/photo-gallery' },
  { labelKey: 'pages.videoGallery', href: '/video-gallery' },
  { labelKey: 'pages.normativeBase', href: '/normative-base' },
  { labelKey: 'pages.portfolio', href: '/portfolio' },
  { labelKey: 'pages.usefulLinks', href: '/useful-links' },
  { labelKey: 'pages.nush', href: '/nush' },
  { labelKey: 'pages.parents', href: '/parents' },

  { labelKey: 'pages.futureFirstGraders', href: '/future-first-graders' },
  { labelKey: 'pages.myAchievements', href: '/my-achievements' },
  { labelKey: 'pages.ourAchievements', href: '/our-achievements' },
]

const Footer = () => {
  const t = useTranslations('Footer')
  const locale = useLocale()

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__content">
          <div className="footer__column footer__column--brand">
            <Link href={`/${locale}`} className="footer__logo">
              <Image
                src="/img/logo/logo_new.png"
                width={70}
                height={70}
                alt={t('logoAlt')}
              />
              <span>{t('siteTitle')}</span>
            </Link>

            <p className="footer__description">{t('description')}</p>

            <div className="footer__socials">
              <a
                href="https://youtube.com/@БилыкИрина-г1х"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.facebook.com/share/19DLzW7d6C/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h3>{t('contactHeading')}</h3>

            <div className="footer__info">
              <span className="footer__label">{t('emailLabel')}</span>
              <a href="mailto:teacher@example.com">
                bilykira19770329@gmail.com
              </a>
            </div>

            <div className="footer__info">
              <span className="footer__label">{t('addressLabel')}</span>
              <p>{t('schoolAddress')}</p>
            </div>
          </div>

          <div className="footer__column">
            <h3>{t('pagesHeading')}</h3>

            <ul className="footer__links">
              {sections.map((section) => (
                <li key={section.href}>
                  <Link href={section.href.startsWith('#') ? `/${locale}${section.href}` : `/${locale}${section.href}`}>{t(section.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

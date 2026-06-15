'use client'

import React from 'react'
import './Hero.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('Hero')

  return (
    <div className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__content__items">
            <div className="hero__text">
              <h1 className="hero__text__title">{t('title')}</h1>
              <p className="hero__text__description">{t('description')}</p>
            </div>
            <div className="hero__button">
              <Link href="/about" className="hero__button__link">
                {t('button')}
              </Link>
            </div>
          </div>
          <div className="hero__image">
            <Image
              src="/img/hero/1.png"
              width={300}
              height={400}
              alt={t('imageAlt')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

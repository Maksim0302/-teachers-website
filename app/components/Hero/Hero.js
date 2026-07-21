'use client'

import React from 'react'
import './Hero.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

const Hero = ({ content }) => {
  const locale = useLocale()

  if (!content) return null

  const href = content.link?.startsWith('/') ? `/${locale}${content.link}` : content.link

  return (
    <div className="hero" id="about-me">
      <div className="container">
        <div className="hero__content">
          <div className="hero__content__items">
            <div className="hero__text">
              <h1 className="hero__text__title">{content.title}</h1>
              {content.subtitle && (
                <p
                  className="hero__text__subtitle"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {content.subtitle}
                </p>
              )}
              <p className="hero__text__description">«{content.description}»</p>
            </div>
            <div className="hero__button">
              <Link href={href} className="hero__button__link">
                {content.button}
              </Link>
            </div>
          </div>
          <div className="hero__image">
            <Image
              src={content.imageUrl}
              width={300}
              height={400}
              alt={content.imageAlt || content.title}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

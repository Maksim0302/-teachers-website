'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import './ AdvancedTraining.scss'

const trainingItems = [
  {
    id: 1,
    key: 'item1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5 12 3l8 3.5v9L12 21l-8-5.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.5V21M4 6.5 12 11.5l8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    key: 'item2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5 12 3l8 3.5v9L12 21l-8-5.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.5V21M4 6.5 12 11.5l8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    key: 'item3',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5 12 3l8 3.5v9L12 21l-8-5.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.5V21M4 6.5 12 11.5l8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    key: 'item4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6.5 12 3l8 3.5v9L12 21l-8-5.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 11.5V21M4 6.5 12 11.5l8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const sectionLink = {
  href: '/about',
}

const sectionImage = {
  src: '/img/hero/1.png',
  width: 420,
  height: 520,
}

const AdvancedTraining = () => {
  const t = useTranslations('AdvancedTraining')

  return (
    <section className="advanced-training">
      <div className="container">
        <div className="advanced-training__content">
          <div className="advanced-training__text">
            <h2 className="advanced-training__title">{t('title')}</h2>

            <div className="advanced-training__items">
              {trainingItems.map((item) => (
                <article key={item.id} className="advanced-training__item">
                  <div className="advanced-training__item-icon">
                    {item.icon}
                  </div>
                  <div className="advanced-training__item-body">
                    <h3 className="advanced-training__item-name">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="advanced-training__item-description">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="advanced-training__image">
            <Image
              src={sectionImage.src}
              width={sectionImage.width}
              height={sectionImage.height}
              alt={t('imageAlt')}
            />
          </div>
        </div>

        <Link href={sectionLink.href} className="advanced-training__link">
          {t('button')}
        </Link>
      </div>
    </section>
  )
}

export default AdvancedTraining

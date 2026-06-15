'use client'

import React from 'react'
import './Assessment Methodology.scss'
import { useTranslations } from 'next-intl'

const cards = [
  { id: 1, key: 'card1', stripeColor: '#00838f' },
  { id: 2, key: 'card2', stripeColor: '#24313e' },
  { id: 3, key: 'card3', stripeColor: '#4a7c59' },
]

const AssessmentMethodology = () => {
  const t = useTranslations('AssessmentMethodology')

  return (
    <section className="assessment-methodology">
      <div className="container">
        <div className="assessment-methodology__content">
          <div className="assessment-methodology__title">
            <h2>{t('title')}</h2>
          </div>
          <div className="assessment-methodology__cards">
            {cards.map((card) => (
              <article key={card.id} className="assessment-methodology__card">
                <span
                  className="assessment-methodology__card-stripe"
                  style={{ backgroundColor: card.stripeColor }}
                />
                <h4 className="assessment-methodology__card-title">
                  {t(`cards.${card.key}.title`)}
                </h4>
                <p className="assessment-methodology__card-description">
                  {t(`cards.${card.key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssessmentMethodology

'use client'

import React from 'react'
import './AssessmentMethodology.scss'

const AssessmentMethodology = ({ content }) => {
  if (!content) return null

  return (
    <section className="assessment-methodology">
      <div className="container">
        <div className="assessment-methodology__content">
          <div className="assessment-methodology__title">
            <h2>{content.title}</h2>
          </div>
          <div className="assessment-methodology__cards">
            {content.cards.map((card) => (
              <article key={card.id} className="assessment-methodology__card">
                <span
                  className="assessment-methodology__card-stripe"
                  style={{ backgroundColor: card.stripeColor }}
                />
                <h4 className="assessment-methodology__card-title">
                  {card.title}
                </h4>
                <p className="assessment-methodology__card-description">
                  {card.description}
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

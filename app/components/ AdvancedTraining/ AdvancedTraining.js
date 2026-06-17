'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './ AdvancedTraining.scss'

const icons = [
  <svg key="icon-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  </svg>,
  <svg key="icon-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  </svg>,
  <svg key="icon-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  </svg>,
  <svg key="icon-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  </svg>,
]

const AdvancedTraining = ({ content }) => {
  if (!content) return null

  return (
    <section className="advanced-training">
      <div className="container">
        <div className="advanced-training__content">
          {/* TEXT BLOCK */}
          <div className="advanced-training__text">
            <h2 className="advanced-training__title">{content.title}</h2>

            <div className="advanced-training__items">
              {content.items?.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="advanced-training__item"
                >
                  <div className="advanced-training__item-icon">
                    {icons[index % icons.length]}
                  </div>

                  <div className="advanced-training__item-body">
                    <h3 className="advanced-training__item-name">
                      {item.title}
                    </h3>

                    <p className="advanced-training__item-description">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="advanced-training__image">
            <Image
              src={content.imageUrl}
              width={420}
              height={520}
              alt={content.imageAlt || content.title}
            />
          </div>
        </div>

        {/* CTA BUTTON */}
        <Link href={content.link} className="advanced-training__link">
          {content.button}
        </Link>
      </div>
    </section>
  )
}

export default AdvancedTraining

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './EventsSchool.scss'

const EventsSchool = ({ content }) => {
  const categories = content?.categories ?? []
  const [activeTabId, setActiveTabId] = useState(categories[0]?.id ?? '')

  if (!content || categories.length === 0) return null

  const activeCategory =
    categories.find((category) => category.id === activeTabId) ?? categories[0]

  return (
    <section className="events-school" id="school-events">
      <div className="container">
        <div className="events-school__content">
          <div className="events-school__title">
            <h2>{content.title}</h2>
          </div>

          <div className="events-school__tabs" role="tablist">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={activeCategory.id === category.id}
                aria-controls={`panel-${category.id}`}
                className={`events-school__tab${
                  activeCategory.id === category.id
                    ? ' events-school__tab--active'
                    : ''
                }`}
                onClick={() => setActiveTabId(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div
            className="events-school__list"
            role="tabpanel"
            id={`panel-${activeCategory.id}`}
            aria-labelledby={`tab-${activeCategory.id}`}
          >
            {activeCategory.events.map((event) => (
              <article key={event.id} className="events-school__item">
                <div className="events-school__item-image">
                  <Image
                    src={event.imageUrl}
                    width={400}
                    height={320}
                    quality={90}
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    alt={event.title}
                  />
                </div>
                <div className="events-school__item__divider">
                  <div className="events-school__item-info">
                    <h3 className="events-school__item-title">{event.title}</h3>
                    <time className="events-school__item-date">
                      {event.date}
                    </time>
                  </div>
                  <Link
                    href={event.href}
                    className="events-school__item-link"
                    aria-label={content.button}
                  >
                    {content.button}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSchool

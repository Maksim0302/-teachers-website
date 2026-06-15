'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import './SchoolEvents.scss'

const tabs = [
  { id: 'all', key: 'all' },
  { id: 'competitions', key: 'competitions' },
  { id: 'excursions', key: 'excursions' },
  { id: 'holidays', key: 'holidays' },
  { id: 'projects', key: 'projects' },
]

const events = [
  {
    id: 1,
    tabId: 'all',
    key: 'event1',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 2,
    tabId: 'all',
    key: 'event2',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 3,
    tabId: 'all',
    key: 'event3',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 4,
    tabId: 'all',
    key: 'event4',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 5,
    tabId: 'competitions',
    key: 'event1',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 6,
    tabId: 'competitions',
    key: 'event2',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 7,
    tabId: 'competitions',
    key: 'event3',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 8,
    tabId: 'competitions',
    key: 'event4',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 9,
    tabId: 'excursions',
    key: 'event1',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 10,
    tabId: 'excursions',
    key: 'event2',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 11,
    tabId: 'excursions',
    key: 'event3',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 12,
    tabId: 'excursions',
    key: 'event4',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 13,
    tabId: 'holidays',
    key: 'event1',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 14,
    tabId: 'holidays',
    key: 'event2',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 15,
    tabId: 'holidays',
    key: 'event3',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 16,
    tabId: 'holidays',
    key: 'event4',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 17,
    tabId: 'projects',
    key: 'event1',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 18,
    tabId: 'projects',
    key: 'event2',
    image: '/img/hero/1.png',
    href: '/about',
  },
  {
    id: 19,
    tabId: 'projects',
    key: 'event3',
    image: '/img/hero/1.png',
    href: '/blog',
  },
  {
    id: 20,
    tabId: 'projects',
    key: 'event4',
    image: '/img/hero/1.png',
    href: '/about',
  },
]

const SchoolEvents = () => {
  const t = useTranslations('SchoolEvents')
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const activeEvents = events.filter((event) => event.tabId === activeTab)

  return (
    <section className="school-events">
      <div className="container">
        <div className="school-events__content">
          <div className="school-events__title">
            <h2>{t('title')}</h2>
          </div>

          <div className="school-events__tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`school-events__tab${
                  activeTab === tab.id ? ' school-events__tab--active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(`tabs.${tab.key}`)}
              </button>
            ))}
          </div>

          <div className="school-events__list" role="tabpanel">
            {activeEvents.map((event) => (
              <article key={event.id} className="school-events__item">
                <div className="school-events__item-image">
                  <Image
                    src={event.image}
                    width={100}
                    height={75}
                    alt={t(`items.${event.tabId}.${event.key}.title`)}
                  />
                </div>
                <div className="school-events__item__divider">
                  <div className="school-events__item-info">
                    <h3 className="school-events__item-title">
                      {t(`items.${event.tabId}.${event.key}.title`)}
                    </h3>
                    <time className="school-events__item-date">
                      {t(`items.${event.tabId}.${event.key}.date`)}
                    </time>
                  </div>
                  <Link
                    href={event.href}
                    className="school-events__item-link"
                    aria-label={t('button')}
                  >
                    <span
                      className="school-events__item-link-icon"
                      aria-hidden="true"
                    />
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

export default SchoolEvents

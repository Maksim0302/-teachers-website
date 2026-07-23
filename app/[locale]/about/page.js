import React from 'react'
import AboutPageContent from '../../about/components/AboutPageContent'
import { createPageMetadata } from '../../lib/seo'
import { BreadcrumbStructuredData } from '../../components/Seo/StructuredData'

async function getTeacherData(locale) {
  // Динамічно завантажуємо переводи
  let messages
  try {
    messages = await import(`@/messages/${locale}.json`)
  } catch {
    messages = await import(`@/messages/uk.json`)
  }
  return messages.default.teacher
}

async function getLabels(locale) {
  // Динамічно завантажуємо мітки сторінки
  let messages
  try {
    messages = await import(`@/messages/${locale}.json`)
  } catch {
    messages = await import(`@/messages/uk.json`)
  }
  return messages.default.aboutPageLabels
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const teacherData = await getTeacherData(locale)

  const titles = {
    uk: 'Про вчителя',
    en: 'About Teacher',
    ru: 'О педагоге',
  }

  const descriptions = {
    uk: `Детальна інформація про вчителя ${teacherData.fullName}`,
    en: `Detailed information about teacher ${teacherData.fullName}`,
    ru: `Подробная информация о педагоге ${teacherData.fullName}`,
  }

  return createPageMetadata({
    locale,
    path: 'about',
    title: titles[locale] || titles.uk,
    description: descriptions[locale] || descriptions.uk,
    keywords: ['вчитель', 'педагог', teacherData.fullName],
    image: '/img/about/1.jpg',
  })
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  const teacherData = await getTeacherData(locale)
  const labels = await getLabels(locale)

  return (
    <>
      <BreadcrumbStructuredData locale={locale} items={[{ name: 'Home', path: '' }, { name: teacherData.fullName, path: 'about' }]} />
      <AboutPageContent
      teacherData={teacherData}
      locale={locale}
      labels={labels}
      />
    </>
  )
}

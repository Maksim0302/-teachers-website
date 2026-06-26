import React from 'react'
import AboutPageContent from '../../about/components/AboutPageContent'

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

  return {
    title: titles[locale] || titles.uk,
    description: descriptions[locale] || descriptions.uk,
  }
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  const teacherData = await getTeacherData(locale)
  const labels = await getLabels(locale)

  return (
    <AboutPageContent
      teacherData={teacherData}
      locale={locale}
      labels={labels}
    />
  )
}

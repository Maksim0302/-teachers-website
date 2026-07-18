import { Cabin } from 'next/font/google'
import '../../globals.scss'
import Providers from '../../[locale]/Providers'
import enMessages from '../../../messages/en.json'
import ruMessages from '../../../messages/ru.json'
import ukMessages from '../../../messages/uk.json'
import { StructuredData } from '../Seo/StructuredData'
import { siteUrl } from '@/app/lib/seo'

const inter = Cabin({ subsets: ['latin'] })

const messages = {
  en: enMessages,
  ru: ruMessages,
  uk: ukMessages,
}

function getTimeZone() {
  try {
    if (
      typeof Intl !== 'undefined' &&
      typeof Intl.DateTimeFormat === 'function'
    ) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      return timeZone || 'America/New_York'
    }
  } catch (error) {
    console.error('Error detecting time zone:', error)
  }

  return 'America/New_York'
}

export default function SiteDocument({ children, locale = 'en' }) {
  const currentMessages = messages[locale] || messages.en
  const timeZone = getTimeZone()
  const teacher = currentMessages.teacher
  const person = teacher && {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: teacher.fullName,
    jobTitle: teacher.title,
    email: teacher.email,
    worksFor: teacher.workplace ? { '@type': 'Organization', name: teacher.workplace } : undefined,
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StructuredData data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebSite', name: 'Educational Portal', url: siteUrl.toString(), inLanguage: locale },
            { '@type': 'Organization', name: teacher?.workplace || 'Educational Portal', url: siteUrl.toString() },
            person,
          ].filter(Boolean),
        }} />
        <Providers
          locale={locale}
          messages={currentMessages}
          timeZone={timeZone}
        >
          {children}
        </Providers>
      </body>
    </html>
  )
}

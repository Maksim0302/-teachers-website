import { Cabin } from 'next/font/google'
import '../globals.scss'
import Providers from './Providers'

import enMessages from '../../messages/en.json'
import ruMessages from '../../messages/ru.json'
import ukMessages from '../../messages/uk.json'

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

  // Fallback if detection fails
  return 'America/New_York'
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params
  const currentMessages = messages[locale] || messages['en']
  const timeZone = getTimeZone()

  return (
    <html lang={locale || 'en'}>
      <body className={inter.className}>
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

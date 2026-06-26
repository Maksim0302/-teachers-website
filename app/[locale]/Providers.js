'use client'

import { NextIntlClientProvider } from 'next-intl'
import { LanguageProvider } from '../context/LanguageContext'
import { SelectedImageProvider } from '../context/SelectedImageContext'
import { LinksProvider } from '../context/LinksContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocaleSaver from '../components/LocaleSaver/LocaleSaver'
import { useHeaderHeight } from '../hooks/useHeaderHeight'

export default function Providers({ children, locale, messages, timeZone }) {
  const headerRef = useHeaderHeight()

  return (
    <NextIntlClientProvider
      timeZone={timeZone}
      locale={locale}
      messages={messages}
    >
      <LocaleSaver locale={locale} />
      <LanguageProvider>
        <SelectedImageProvider>
          <LinksProvider>
            <div className="site-layout">
              <Header ref={headerRef} />
              <main>{children}</main>
              <Footer />
            </div>
          </LinksProvider>
        </SelectedImageProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  )
}

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = [
  'en',
  'da',
  'de',
  'es',
  'fr',
  'hr',
  'id',
  'it',
  'hu',
  'nl',
  'no',
  'pl',
  'pt',
  'ro',
  'fi',
  'sv',
  'vi',
  'tr',
  'cs',
  'el',
  'ru',
  'uk',
  'bg',
  'th',
  'ja',
  'zh',
  'ko',
  'he',
  'ar',
]

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound()
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

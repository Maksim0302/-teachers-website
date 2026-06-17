import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadMessages(locale) {
  return JSON.parse(
    readFileSync(join(root, 'messages', `${locale}.json`), 'utf8')
  ).EventsSchool
}

function localeString(messages, categoryKey, eventKey, field) {
  return {
    ru: messages.ru.items[categoryKey]?.[eventKey]?.[field] ?? '',
    en: messages.en.items[categoryKey]?.[eventKey]?.[field] ?? '',
    uk: messages.uk.items[categoryKey]?.[eventKey]?.[field] ?? '',
  }
}

function buildSeedDocument() {
  const ru = loadMessages('ru')
  const en = loadMessages('en')
  const uk = loadMessages('uk')
  const messages = { ru, en, uk }

  const categoryKeys = Object.keys(ru.tabs)
  const defaultLinks = ['/blog', '/about', '/blog', '/about']

  return {
    _id: 'eventsSchool',
    _type: 'eventsSchool',
    title: {
      ru: ru.title,
      en: en.title,
      uk: uk.title,
    },
    button: {
      ru: ru.button,
      en: en.button,
      uk: uk.button,
    },
    categories: categoryKeys.map((categoryKey, categoryIndex) => ({
      _key: `category-${categoryKey}`,
      label: {
        ru: ru.tabs[categoryKey],
        en: en.tabs[categoryKey],
        uk: uk.tabs[categoryKey],
      },
      slug: { _type: 'slug', current: categoryKey },
      order: categoryIndex,
      events: Object.keys(ru.items[categoryKey]).map((eventKey, eventIndex) => ({
        _key: `${categoryKey}-${eventKey}`,
        title: localeString(messages, categoryKey, eventKey, 'title'),
        date: localeString(messages, categoryKey, eventKey, 'date'),
        link: defaultLinks[eventIndex] ?? '/blog',
      })),
    })),
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}

if (!token) {
  console.error('Missing SANITY_API_TOKEN (create at sanity.io/manage → API → Tokens)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

const document = buildSeedDocument()

await client.createOrReplace(document)

console.log('Events School document seeded successfully.')
console.log('Open /studio → Events School and upload images for each event.')

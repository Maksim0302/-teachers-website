import { client } from './client'
import { urlFor } from './image'

export const HOME_PAGE_QUERY = `{
  "hero": *[_type == "hero"][0]{
    title,
    subtitle,
    description,
    button,
    link,
    imageAlt,
    image
  },
  "assessmentMethodology": *[_type == "assessmentMethodology"][0]{
    title,
    cards[]{
      title,
      description,
      stripeColor
    }
  },
  "advancedTraining": *[_type == "advancedTraining"][0]{
    title,
    button,
    imageAlt,
    link,
    image,
    items[]{
      title,
      description
    }
  },
  "eventsSchool": *[_type == "eventsSchool"][0]{
    title,
    button,
    categories[]{
      "id": slug.current,
      label,
      order,
      events[]{
        title,
        date,
        link,
        image
      }
    }
  }
}`

export function getLocalizedValue(field, locale, fallbackLocale = 'en') {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[locale] || field[fallbackLocale] || Object.values(field)[0] || ''
}

export async function getHomePageData() {
  if (!client) return null

  try {
    return await client.fetch(HOME_PAGE_QUERY)
  } catch (error) {
    console.error('Failed to fetch home page data from Sanity:', error)
    return null
  }
}

export function mapHeroData(data, locale) {
  if (!data) return null

  const imageBuilder = data.image ? urlFor(data.image) : null
  const imageUrl = imageBuilder
    ? imageBuilder.width(300).height(400).fit('crop').url()
    : null

  if (!imageUrl) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    description: getLocalizedValue(data.description, locale),
    button: getLocalizedValue(data.button, locale),
    link: data.link || '/about',
    imageAlt: getLocalizedValue(data.imageAlt, locale),
    imageUrl,
  }
}

export function mapAssessmentMethodologyData(data, locale) {
  if (!data?.cards?.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    cards: data.cards.map((card, index) => ({
      id: index + 1,
      title: getLocalizedValue(card.title, locale),
      description: getLocalizedValue(card.description, locale),
      stripeColor: card.stripeColor,
    })),
  }
}

export function mapAdvancedTrainingData(data, locale) {
  if (!data?.items?.length) return null

  const imageBuilder = data.image ? urlFor(data.image) : null
  const imageUrl = imageBuilder
    ? imageBuilder.width(420).height(520).fit('max').quality(90).url()
    : null

  if (!imageUrl) return null

  return {
    title: getLocalizedValue(data.title, locale),
    button: getLocalizedValue(data.button, locale),
    imageAlt: getLocalizedValue(data.imageAlt, locale),
    link: data.link || '/about',
    imageUrl,
    items: data.items.map((item, index) => ({
      id: index + 1,
      title: getLocalizedValue(item.title, locale),
      description: getLocalizedValue(item.description, locale),
    })),
  }
}

export function mapEventsSchoolData(data, locale) {
  if (!data?.categories?.length) return null

  const categories = data.categories
    .filter((category) => category.id)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((category) => ({
      id: category.id,
      label: getLocalizedValue(category.label, locale),
      events: (category.events || [])
        .map((event, index) => {
          const imageBuilder = event.image ? urlFor(event.image) : null
          const imageUrl = imageBuilder
            ? imageBuilder.width(500).height(400).fit('max').quality(90).url()
            : null

          if (!imageUrl) return null

          return {
            id: `${category.id}-${index}`,
            title: getLocalizedValue(event.title, locale),
            date: getLocalizedValue(event.date, locale),
            href: event.link || '/blog',
            imageUrl,
          }
        })
        .filter(Boolean),
    }))
    .filter((category) => category.label && category.events.length > 0)

  if (!categories.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    button: getLocalizedValue(data.button, locale),
    categories,
  }
}

export function mapHomePageData(data, locale) {
  if (!data) return {}

  return {
    hero: mapHeroData(data.hero, locale),
    assessmentMethodology: mapAssessmentMethodologyData(
      data.assessmentMethodology,
      locale
    ),
    advancedTraining: mapAdvancedTrainingData(data.advancedTraining, locale),
    eventsSchool: mapEventsSchoolData(data.eventsSchool, locale),
  }
}

export const MENU_QUERY = `*[_type == "menuNavigation"][0]{
  menuItems[]{
    title,
    slug,
    order,
    children[]{
      title,
      slug,
      order
    }
  }
}`

export async function getMenuData() {
  if (!client) return null

  try {
    return await client.fetch(MENU_QUERY)
  } catch (error) {
    console.error('Failed to fetch menu data from Sanity:', error)
    return null
  }
}

export function mapMenuData(data, locale) {
  if (!data?.menuItems) return []

  // Sort by order and map menu items
  return data.menuItems
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      id: item.slug || `menu-${Math.random()}`,
      label: getLocalizedValue(item.title, locale),
      href: item.slug ? `/${item.slug}` : null,
      children: item.children
        ? item.children
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((child, idx) => ({
              id: `${item.slug}-child-${idx}`,
              label: getLocalizedValue(child.title, locale),
              href: `/${child.slug}`,
            }))
        : [],
    }))
}

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
  },
  "videoGallery": *[_type == "videoGallery"][0]{
    title,
    subtitle,
    videos[]{
      title,
      youtubeUrl
    }
  },
  "photoGallery": *[_type == "photoGallery"][0]{
    title,
    subtitle,
    photos[]{
      image,
      alt,
      caption
    }
  }
}`

export function getLocalizedValue(field, locale, fallbackLocale = 'en') {
  if (!field) return ''

  // If it's already a string (not a locale object)
  if (typeof field === 'string') return field

  // Try to get value in order: requested locale → fallback locale → first available value
  if (field[locale] && field[locale].trim?.() !== '') return field[locale]
  if (field[fallbackLocale] && field[fallbackLocale].trim?.() !== '')
    return field[fallbackLocale]

  // Find first non-empty value
  const values = Object.values(field).filter(
    (v) => v && typeof v === 'string' && v.trim() !== ''
  )
  return values[0] || ''
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
    videoGallery: mapVideoGalleryData(data.videoGallery, locale),
    photoGallery: mapPhotoGalleryData(data.photoGallery, locale),
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

// ============== GRADUATES DATA ==============

export const GRADUATES_ALL_QUERY = `*[_type == "graduate"] | order(year desc) {
  year,
  title,
  subtitle,
  description,
  photos[]{
    image,
    alt
  }
}`

export const GRADUATES_BY_YEAR_QUERY = `*[_type == "graduate" && year == $year][0] {
  year,
  title,
  subtitle,
  description,
  photos[]{
    image,
    alt
  }
}`

export async function getGraduatesData() {
  if (!client) return null

  try {
    return await client.fetch(GRADUATES_ALL_QUERY)
  } catch (error) {
    console.error('Failed to fetch graduates data from Sanity:', error)
    return null
  }
}

export async function getGraduateByYear(year) {
  if (!client) return null

  try {
    return await client.fetch(GRADUATES_BY_YEAR_QUERY, { year })
  } catch (error) {
    console.error(`Failed to fetch graduate ${year} from Sanity:`, error)
    return null
  }
}

export function mapGraduateData(data, locale) {
  if (!data) return null

  const photos = (data.photos || [])
    .map((photo) => {
      if (!photo.image) return null

      const imageBuilder = urlFor(photo.image)
      const imageUrl = imageBuilder
        ? imageBuilder.width(1800).fit('max').auto('format').quality(100).url()
        : null

      if (!imageUrl) return null

      return {
        imageUrl,
        alt: getLocalizedValue(photo.alt, locale),
      }
    })
    .filter(Boolean)

  const title = getLocalizedValue(data.title, locale)
  const subtitle = getLocalizedValue(data.subtitle, locale)

  // Don't require photos, but require at least a title
  if (!title) return null

  return {
    year: data.year,
    title,
    subtitle,
    description: getLocalizedValue(data.description, locale),
    photos,
  }
}

// ============== VIDEO GALLERY DATA ==============

export const VIDEO_GALLERY_QUERY = `*[_type == "videoGallery"][0] {
  title,
  subtitle,
  videos[]{
    title,
    youtubeUrl
  }
}`

export async function getVideoGalleryData() {
  if (!client) return null

  try {
    return await client.fetch(VIDEO_GALLERY_QUERY)
  } catch (error) {
    console.error('Failed to fetch video gallery data from Sanity:', error)
    return null
  }
}

function extractYoutubeId(url) {
  if (!url) return null

  // Handle youtu.be format
  let videoId = url.match(/youtu\.be\/([^?]+)/)
  if (videoId) return videoId[1]

  // Handle youtube.com format
  videoId = url.match(/[?&]v=([^&]+)/)
  if (videoId) return videoId[1]

  return null
}

export function mapVideoGalleryData(data, locale) {
  if (!data) return null

  const videos = (data.videos || [])
    .map((video) => {
      const videoId = extractYoutubeId(video.youtubeUrl)
      if (!videoId) return null

      return {
        id: videoId,
        title: getLocalizedValue(video.title, locale),
        youtubeUrl: video.youtubeUrl,
        youtubeId: videoId,
      }
    })
    .filter(Boolean)

  if (!videos.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    videos,
  }
}

export const PHOTO_GALLERY_QUERY = `*[_type == "photoGallery"][0]{
  title,
  subtitle,
  photos[]{
    image,
    alt,
    caption
  }
}`

export async function getPhotoGalleryData() {
  if (!client) return null

  try {
    return await client.fetch(PHOTO_GALLERY_QUERY)
  } catch (error) {
    console.error('Failed to fetch photo gallery data from Sanity:', error)
    return null
  }
}
export function mapPhotoGalleryData(data, locale) {
  if (!data?.photos?.length) return null

  const photos = data.photos
    .map((photo, index) => {
      if (!photo.image) return null

      return {
        id: `photo-${index}`,
        image: photo.image,

        // Изображение для галереи
        imageUrl: urlFor(photo.image)
          .width(1600)
          .fit('max')
          .auto('format')
          .quality(100)
          .url(),

        // Полноразмерное изображение
        imageUrlFull: urlFor(photo.image)
          .width(3000)
          .fit('max')
          .auto('format')
          .quality(100)
          .url(),

        alt: getLocalizedValue(photo.alt, locale),
        caption: getLocalizedValue(photo.caption, locale),
      }
    })
    .filter(Boolean)

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    photos,
  }
}

// ============== NORMATIVE BASE DATA ==============

export const NORMATIVE_BASE_QUERY = `*[_type == "normativeBase"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        url,
        originalFilename
      }
    }
  }
}`

export async function getNormativeBaseData() {
  if (!client) return null

  try {
    return await client.fetch(NORMATIVE_BASE_QUERY)
  } catch (error) {
    console.error('Failed to fetch normative base data from Sanity:', error)
    return null
  }
}

export function mapNormativeBaseData(data, locale) {
  if (!data?.documents?.length) return null

  const documents = data.documents
    .map((doc, index) => {
      if (!doc.file?.asset?.url) return null

      const fileName = doc.file.asset.originalFilename || 'document'
      const fileExtension = fileName.split('.').pop().toLowerCase()
      const fileUrl = doc.file.asset.url

      return {
        id: `doc-${index}`,
        title: getLocalizedValue(doc.title, locale),
        description: getLocalizedValue(doc.description, locale),
        fileName,
        fileExtension,
        fileUrl,
        fileType: ['pdf'].includes(fileExtension) ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!documents.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
  }
}

export const PORTFOLIO_QUERY = `*[_type == "portfolio"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        url,
        originalFilename
      }
    }
  }
}`

export async function getPortfolioData() {
  if (!client) return null

  try {
    return await client.fetch(PORTFOLIO_QUERY)
  } catch (error) {
    console.error('Failed to fetch portfolio data from Sanity:', error)
    return null
  }
}

export function mapPortfolioData(data, locale) {
  if (!data?.documents?.length) return null

  const documents = data.documents
    .map((doc, index) => {
      if (!doc.file?.asset?.url) return null

      const fileName = doc.file.asset.originalFilename || 'document'
      const fileExtension = fileName.split('.').pop().toLowerCase()
      const fileUrl = doc.file.asset.url

      return {
        id: `portfolio-doc-${index}`,
        title: getLocalizedValue(doc.title, locale),
        description: getLocalizedValue(doc.description, locale),
        fileName,
        fileExtension,
        fileUrl,
        fileType: ['pdf'].includes(fileExtension) ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!documents.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
  }
}

export const USEFUL_LINKS_QUERY = `*[_type == "usefulLinks"][0]{
  title,
  subtitle,
  files[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  }
}`

export async function getUsefulLinksData() {
  if (!client) return null

  try {
    return await client.fetch(USEFUL_LINKS_QUERY)
  } catch (error) {
    console.error('Failed to fetch useful links data from Sanity:', error)
    return null
  }
}

export function mapUsefulLinksData(data, locale) {
  if (!data?.files?.length) return null

  const files = data.files
    .map((file, index) => {
      if (!file.file?.asset?.url) return null

      const fileUrl = file.file.asset.url
      const fileName = file.file.asset.originalFilename || ''
      const fileExtension = fileName.split('.').pop().toLowerCase()

      return {
        id: `file-${index}`,
        title: getLocalizedValue(file.title, locale),
        description: getLocalizedValue(file.description, locale),
        fileUrl,
        fileName,
        fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!files.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents: files,
  }
}

export const NUSH_QUERY = `*[_type == "nush"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  }
}`

export async function getNushData() {
  if (!client) return null

  try {
    return await client.fetch(NUSH_QUERY)
  } catch (error) {
    console.error('Failed to fetch NUŠ data from Sanity:', error)
    return null
  }
}

export function mapNushData(data, locale) {
  if (!data?.documents?.length) return null

  const documents = data.documents
    .map((doc, index) => {
      if (!doc.file?.asset?.url) return null

      const fileUrl = doc.file.asset.url
      const fileName = doc.file.asset.originalFilename || ''
      const fileExtension = fileName.split('.').pop().toLowerCase()

      return {
        id: `doc-${index}`,
        title: getLocalizedValue(doc.title, locale),
        description: getLocalizedValue(doc.description, locale),
        fileUrl,
        fileName,
        fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
      }
    })
    .filter(Boolean)

  if (!documents.length) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
  }
}

// ============== PARENTS PAGE DATA ==============

export const PARENTS_QUERY = `*[_type == "parents"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  },
  gallery[]{
    image{
      asset->{
        url
      }
    },
    alt
  }
}`

export async function getParentsData() {
  if (!client) return null

  try {
    return await client.fetch(PARENTS_QUERY)
  } catch (error) {
    console.error('Failed to fetch parents page data from Sanity:', error)
    return null
  }
}

export function mapParentsData(data, locale) {
  if (!data) return null

  // Map documents
  const documents =
    data.documents && data.documents.length > 0
      ? data.documents
          .map((doc, index) => {
            if (!doc.file?.asset?.url) return null

            const fileUrl = doc.file.asset.url
            const fileName = doc.file.asset.originalFilename || 'document'
            const fileExtension = fileName.split('.').pop().toLowerCase()

            return {
              id: `parent-doc-${index}`,
              title: getLocalizedValue(doc.title, locale),
              description: getLocalizedValue(doc.description, locale),
              fileUrl,
              fileName,
              fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
            }
          })
          .filter(Boolean)
      : []

  // Map gallery
  const gallery =
    data.gallery && data.gallery.length > 0
      ? data.gallery
          .map((item, index) => {
            if (!item.image?.asset?.url) return null

            return {
              id: `gallery-${index}`,
              imageUrl: item.image.asset.url,
              alt: getLocalizedValue(item.alt, locale),
            }
          })
          .filter(Boolean)
      : []

  // If we have no content, return null
  if (documents.length === 0 && gallery.length === 0) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
    gallery,
  }
}

// ============== LEGO PAGE DATA ==============

export const LEGO_QUERY = `*[_type == "lego"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  },
  gallery[]{
    image{
      asset->{
        url
      }
    },
    alt
  }
}`

export async function getLegoData() {
  if (!client) return null

  try {
    return await client.fetch(LEGO_QUERY)
  } catch (error) {
    console.error('Failed to fetch LEGO page data from Sanity:', error)
    return null
  }
}

export function mapLegoData(data, locale) {
  if (!data) return null

  // Map documents
  const documents =
    data.documents && data.documents.length > 0
      ? data.documents
          .map((doc, index) => {
            if (!doc.file?.asset?.url) return null

            const fileUrl = doc.file.asset.url
            const fileName = doc.file.asset.originalFilename || 'document'
            const fileExtension = fileName.split('.').pop().toLowerCase()

            return {
              id: `lego-doc-${index}`,
              title: getLocalizedValue(doc.title, locale),
              description: getLocalizedValue(doc.description, locale),
              fileUrl,
              fileName,
              fileType: fileExtension === 'pdf' ? 'pdf' : 'word',
            }
          })
          .filter(Boolean)
      : []

  // Map gallery
  const gallery =
    data.gallery && data.gallery.length > 0
      ? data.gallery
          .map((item, index) => {
            if (!item.image?.asset?.url) return null

            return {
              id: `lego-gallery-${index}`,
              imageUrl: item.image.asset.url,
              alt: getLocalizedValue(item.alt, locale),
            }
          })
          .filter(Boolean)
      : []

  // If we have no content, return null
  if (documents.length === 0 && gallery.length === 0) return null

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
    gallery,
  }
}

// ============== BZHD DATA ==============

export const BZHD_QUERY = `*[_type == "bzhd"][0]{
  title,
  subtitle,
  documents[]{
    title,
    description,
    file{
      asset->{
        originalFilename,
        url
      }
    }
  },
  photos[]{
    image,
    alt,
    caption
  }
}`

export async function getBzhdData() {
  if (!client) return null

  try {
    return await client.fetch(BZHD_QUERY)
  } catch (error) {
    console.error('Failed to fetch BZHD data from Sanity:', error)
    return null
  }
}

export function mapBzhdData(data, locale) {
  if (!data) return null

  // Process documents
  const documents = data.documents
    ? data.documents
        .map((doc, index) => {
          if (!doc.file?.asset?.url) return null

          const fileName = doc.file.asset.originalFilename || 'document'
          const fileExtension = fileName.split('.').pop().toLowerCase()
          const fileUrl = doc.file.asset.url

          return {
            id: `bzhd-doc-${index}`,
            title: getLocalizedValue(doc.title, locale),
            description: getLocalizedValue(doc.description, locale),
            fileName,
            fileExtension,
            fileUrl,
            fileType: ['pdf'].includes(fileExtension) ? 'pdf' : 'word',
          }
        })
        .filter(Boolean)
    : []

  // Process photos
  const photos = data.photos
    ? data.photos
        .map((photo, index) => {
          if (!photo.image) return null

          return {
            id: `bzhd-photo-${index}`,
            image: photo.image,
            imageUrl: urlFor(photo.image)
              .width(1600)
              .fit('max')
              .auto('format')
              .quality(100)
              .url(),
            imageUrlFull: urlFor(photo.image)
              .width(3000)
              .fit('max')
              .auto('format')
              .quality(100)
              .url(),
            alt: getLocalizedValue(photo.alt, locale),
            caption: getLocalizedValue(photo.caption, locale),
          }
        })
        .filter(Boolean)
    : []

  return {
    title: getLocalizedValue(data.title, locale),
    subtitle: getLocalizedValue(data.subtitle, locale),
    documents,
    photos,
  }
}

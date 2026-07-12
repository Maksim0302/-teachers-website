import {
  getStudentSubjectsData,
  getStudentSubjectBySlug,
  mapStudentSubjectData,
} from '@/sanity/lib/queries'

export async function getAllStudentSubjectSlugs() {
  try {
    // Fetch all student subjects from Sanity
    const data = await getStudentSubjectsData()

    if (!data) {
      return []
    }

    // Extract slugs
    return data.map((subject) => subject.slug?.current || subject.slug)
  } catch (error) {
    console.error('Failed to get student subject slugs:', error)
    return []
  }
}

export async function getStudentSubjectPage(slug, locale = 'en') {
  try {
    // Fetch specific student subject by slug
    const data = await getStudentSubjectBySlug(slug)

    if (!data) {
      return null
    }

    // Map the data to application format
    return mapStudentSubjectData(data, locale)
  } catch (error) {
    console.error(`Failed to get student subject page for ${slug}:`, error)
    return null
  }
}

export const studentSubjectPages = {}

export function getStudentSubjectPagesData(locale = 'en') {
  return studentSubjectPages[locale] || {}
}

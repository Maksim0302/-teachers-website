import {
  getGraduatesData,
  getGraduateByYear,
  mapGraduateData,
} from '@/sanity/lib/queries'

let graduatesCache = null

export async function getAllGraduateYears() {
  try {
    // Fetch all graduates from Sanity
    const data = await getGraduatesData()

    if (!data) {
      return []
    }

    // Extract years and sort in descending order
    return data.map((graduate) => graduate.year).sort((a, b) => b - a)
  } catch (error) {
    console.error('Failed to get graduate years:', error)
    return []
  }
}

export async function getGraduatePage(slug, locale = 'en') {
  try {
    // Fetch specific graduate by year
    const data = await getGraduateByYear(slug)

    if (!data) {
      return null
    }

    // Map the data to application format
    return mapGraduateData(data, locale)
  } catch (error) {
    console.error(`Failed to get graduate page for ${slug}:`, error)
    return null
  }
}

export const graduatesPages = {}

export function getGraduatePagesData(locale = 'en') {
  return graduatesPages[locale] || {}
}

'use server'
import { getMenuData, mapMenuData } from '@/sanity/lib/queries'

export async function fetchMenuAction(locale) {
  try {
    const data = await getMenuData()

    if (!data) {
      return { menuItems: [], error: null }
    }

    const mappedMenuItems = mapMenuData(data, locale)
    return { menuItems: mappedMenuItems, error: null }
  } catch (error) {
    console.error('Server Action - Menu fetch error:', error)
    return { menuItems: [], error: error.message }
  }
}

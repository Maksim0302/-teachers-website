import { getMenuData, mapMenuData } from '@/sanity/lib/queries'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'

    const data = await getMenuData()

    if (!data) {
      return Response.json(
        { error: 'Failed to fetch menu data', menuItems: [] },
        { status: 500 }
      )
    }

    const mappedMenuItems = mapMenuData(data, locale)

    return Response.json({ menuItems: mappedMenuItems }, { status: 200 })
  } catch (error) {
    console.error('Menu API Error:', error)
    return Response.json(
      { error: 'Internal server error', menuItems: [] },
      { status: 500 }
    )
  }
}

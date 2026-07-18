import { getLegoData, mapLegoData } from '@/sanity/lib/queries'
import Lego from '@/app/components/Lego/Lego'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'lego', content: mapLegoData(await getLegoData(), locale), fallbackTitle: 'LEGO - конструювання', fallbackDescription: 'LEGO construction and learning resources', keywords: ['LEGO', 'конструювання'] })
}

export default async function LegoPage({ params }) {
  const { locale } = await params

  const legoData = await getLegoData()
  const content = mapLegoData(legoData, locale)

  return <Lego content={content} />
}

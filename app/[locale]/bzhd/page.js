import { getBzhdData, mapBzhdData } from '@/sanity/lib/queries'
import BZHD from '@/app/components/BZHD/BZHD'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'bzhd', content: mapBzhdData(await getBzhdData(), locale), fallbackTitle: 'БЖД', fallbackDescription: 'Safety and health resources', keywords: ['безпека життєдіяльності'] })
}

export default async function BZHDPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const bzhdData = await getBzhdData()
  const content = mapBzhdData(bzhdData, locale)

  return <BZHD content={content} />
}

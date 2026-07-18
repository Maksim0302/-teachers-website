import { getNushData, mapNushData } from '@/sanity/lib/queries'
import Nush from '@/app/components/Nush/Nush'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'nush', content: mapNushData(await getNushData(), locale), fallbackTitle: 'НУШ', fallbackDescription: 'Nova Ukrainska Shkola documents', keywords: ['НУШ', 'документи'] })
}

export default async function NushPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const nushData = await getNushData()
  const content = mapNushData(nushData, locale)

  return <Nush content={content} />
}

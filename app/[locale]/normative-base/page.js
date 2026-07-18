import {
  getNormativeBaseData,
  mapNormativeBaseData,
} from '@/sanity/lib/queries'
import NormativeBase from '@/app/components/NormativeBase/NormativeBase'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'normative-base', content: mapNormativeBaseData(await getNormativeBaseData(), locale), fallbackTitle: 'Normative Base', fallbackDescription: 'Access normative and regulatory documents for our educational institution', keywords: ['нормативна база', 'документи'] })
}

export default async function NormativeBasePage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const normativeBaseData = await getNormativeBaseData()
  const content = mapNormativeBaseData(normativeBaseData, locale)

  return <NormativeBase content={content} />
}

import { getParentsData, mapParentsData } from '@/sanity/lib/queries'
import Parents from '@/app/components/Parents/Parents'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'parents', content: mapParentsData(await getParentsData(), locale), fallbackTitle: 'Батьківська сторінка', fallbackDescription: 'Resources and documents for parents', keywords: ['для батьків'] })
}

export default async function ParentsPage({ params }) {
  const { locale } = await params

  const parentsData = await getParentsData()
  const content = mapParentsData(parentsData, locale)

  return <Parents content={content} />
}

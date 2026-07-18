import {
  getPresentationsForLessonsData,
  mapPresentationsForLessonsData,
} from '@/sanity/lib/queries'
import PresentationsForLessons from '@/app/components/PresentationsForLessons/PresentationsForLessons'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'presentations-for-lessons', content: mapPresentationsForLessonsData(await getPresentationsForLessonsData(), locale), fallbackTitle: 'Презентації до уроків та виховних заходів', fallbackDescription: 'Presentations for lessons and educational events', keywords: ['презентації', 'уроки'] })
}

export default async function PresentationsForLessonsPage({ params }) {
  const { locale } = await params

  const data = await getPresentationsForLessonsData()
  const content = mapPresentationsForLessonsData(data, locale)

  return <PresentationsForLessons content={content} />
}

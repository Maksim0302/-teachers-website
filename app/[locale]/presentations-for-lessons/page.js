import {
  getPresentationsForLessonsData,
  mapPresentationsForLessonsData,
} from '@/sanity/lib/queries'
import PresentationsForLessons from '@/app/components/PresentationsForLessons/PresentationsForLessons'

export const metadata = {
  title: 'Презентації до уроків та виховних заходів | Educational Portal',
  description: 'Presentations for lessons and educational events',
}

export default async function PresentationsForLessonsPage({ params }) {
  const { locale } = await params

  const data = await getPresentationsForLessonsData()
  const content = mapPresentationsForLessonsData(data, locale)

  return (
    <div>
      <PresentationsForLessons content={content} />
    </div>
  )
}

import { getParentsData, mapParentsData } from '@/sanity/lib/queries'
import Parents from '@/app/components/Parents/Parents'

export const metadata = {
  title: 'Батьківська сторінка | Educational Portal',
  description: 'Resources and documents for parents',
}

export default async function ParentsPage({ params }) {
  const { locale } = await params

  const parentsData = await getParentsData()
  const content = mapParentsData(parentsData, locale)

  return (
    <div>
      <Parents content={content} />
    </div>
  )
}

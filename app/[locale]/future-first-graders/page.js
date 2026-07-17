import {
  getFutureFirstgradersData,
  mapFutureFirstgradersData,
} from '@/sanity/lib/queries'
import FutureFirstgraders from '@/app/components/FutureFirstgraders/FutureFirstgraders'

export const metadata = {
  title: 'Майбутні першокласники | Educational Portal',
  description: 'Resources for future first graders',
}

export default async function FutureFirstgradersPage({ params }) {
  const { locale } = await params

  const data = await getFutureFirstgradersData()
  const content = mapFutureFirstgradersData(data, locale)

  return (
    <div>
      <FutureFirstgraders content={content} />
    </div>
  )
}

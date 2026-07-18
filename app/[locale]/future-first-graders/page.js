import {
  getFutureFirstgradersData,
  mapFutureFirstgradersData,
} from '@/sanity/lib/queries'
import FutureFirstgraders from '@/app/components/FutureFirstgraders/FutureFirstgraders'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'future-first-graders', content: mapFutureFirstgradersData(await getFutureFirstgradersData(), locale), fallbackTitle: 'Майбутні першокласники', fallbackDescription: 'Resources for future first graders', keywords: ['першокласники'] })
}

export default async function FutureFirstgradersPage({ params }) {
  const { locale } = await params

  const data = await getFutureFirstgradersData()
  const content = mapFutureFirstgradersData(data, locale)

  return <FutureFirstgraders content={content} />
}

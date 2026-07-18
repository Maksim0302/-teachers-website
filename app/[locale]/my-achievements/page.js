import {
  getMyAchievementsData,
  mapMyAchievementsData,
} from '@/sanity/lib/queries'
import MyAchievements from '@/app/components/MyAchievements/MyAchievements'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'my-achievements', content: mapMyAchievementsData(await getMyAchievementsData(), locale), fallbackTitle: 'Мої досягнення', fallbackDescription: 'My achievements and accomplishments', keywords: ['досягнення вчителя'] })
}

export default async function MyAchievementsPage({ params }) {
  const { locale } = await params

  const data = await getMyAchievementsData()
  const content = mapMyAchievementsData(data, locale)

  return <MyAchievements content={content} />
}

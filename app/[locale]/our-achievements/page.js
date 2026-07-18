import {
  getOurAchievementsData,
  mapOurAchievementsData,
} from '@/sanity/lib/queries'
import OurAchievements from '@/app/components/OurAchievements/OurAchievements'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'our-achievements', content: mapOurAchievementsData(await getOurAchievementsData(), locale), fallbackTitle: 'Наші досягнення', fallbackDescription: 'Our achievements and accomplishments', keywords: ['досягнення учнів'] })
}

export default async function OurAchievementsPage({ params }) {
  const { locale } = await params

  const data = await getOurAchievementsData()
  const content = mapOurAchievementsData(data, locale)

  return <OurAchievements content={content} />
}

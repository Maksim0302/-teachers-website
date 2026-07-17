import {
  getOurAchievementsData,
  mapOurAchievementsData,
} from '@/sanity/lib/queries'
import OurAchievements from '@/app/components/OurAchievements/OurAchievements'

export const metadata = {
  title: 'Наші досягнення | Educational Portal',
  description: 'Our achievements and accomplishments',
}

export default async function OurAchievementsPage({ params }) {
  const { locale } = await params

  const data = await getOurAchievementsData()
  const content = mapOurAchievementsData(data, locale)

  return (
    <div>
      <OurAchievements content={content} />
    </div>
  )
}

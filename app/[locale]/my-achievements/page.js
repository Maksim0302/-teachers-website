import {
  getMyAchievementsData,
  mapMyAchievementsData,
} from '@/sanity/lib/queries'
import MyAchievements from '@/app/components/MyAchievements/MyAchievements'

export const metadata = {
  title: 'Мої досягнення | Educational Portal',
  description: 'My achievements and accomplishments',
}

export default async function MyAchievementsPage({ params }) {
  const { locale } = await params

  const data = await getMyAchievementsData()
  const content = mapMyAchievementsData(data, locale)

  return (
    <div>
      <MyAchievements content={content} />
    </div>
  )
}

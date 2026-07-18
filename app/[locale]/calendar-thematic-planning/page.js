import {
  getCalendarThematicPlanningData,
  mapCalendarThematicPlanningData,
} from '@/sanity/lib/queries'
import CalendarThematicPlanning from '@/app/components/CalendarThematicPlanning/CalendarThematicPlanning'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'calendar-thematic-planning', content: mapCalendarThematicPlanningData(await getCalendarThematicPlanningData(), locale), fallbackTitle: 'Календарно-тематичне планування', fallbackDescription: 'Calendar and thematic planning resources', keywords: ['календарне планування'] })
}

export default async function CalendarThematicPlanningPage({ params }) {
  const { locale } = await params

  const data = await getCalendarThematicPlanningData()
  const content = mapCalendarThematicPlanningData(data, locale)

  return <CalendarThematicPlanning content={content} />
}

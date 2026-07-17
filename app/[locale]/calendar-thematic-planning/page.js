import {
  getCalendarThematicPlanningData,
  mapCalendarThematicPlanningData,
} from '@/sanity/lib/queries'
import CalendarThematicPlanning from '@/app/components/CalendarThematicPlanning/CalendarThematicPlanning'

export const metadata = {
  title: 'Календарно-тематичне планування | Educational Portal',
  description: 'Calendar and thematic planning resources',
}

export default async function CalendarThematicPlanningPage({ params }) {
  const { locale } = await params

  const data = await getCalendarThematicPlanningData()
  const content = mapCalendarThematicPlanningData(data, locale)

  return (
    <div>
      <CalendarThematicPlanning content={content} />
    </div>
  )
}

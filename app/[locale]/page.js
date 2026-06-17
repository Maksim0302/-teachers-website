import Hero from '../components/Hero/Hero'
import AssessmentMethodology from '../components/AssessmentMethodology/AssessmentMethodology'
import EventsSchool from '../components/EventsSchool/EventsSchool'
import AdvancedTraining from '../components/ AdvancedTraining/ AdvancedTraining'
import { getHomePageData, mapHomePageData } from '@/sanity/lib/queries'

export default async function Home({ params }) {
  const { locale } = await params
  const homePageData = await getHomePageData()
  const content = mapHomePageData(homePageData, locale)

  return (
    <>
      <Hero content={content.hero} />
      <AdvancedTraining content={content.advancedTraining} />
      <AssessmentMethodology content={content.assessmentMethodology} />
      <EventsSchool content={content.eventsSchool} />
    </>
  )
}

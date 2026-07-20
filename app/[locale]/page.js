export const revalidate = 60

import Hero from '../components/Hero/Hero'
import AssessmentMethodology from '../components/AssessmentMethodology/AssessmentMethodology'
import EventsSchool from '../components/EventsSchool/EventsSchool'
import AdvancedTraining from '../components/ AdvancedTraining/ AdvancedTraining'
import { getHomePageData, mapHomePageData } from '@/sanity/lib/queries'
import VideoGallery from '../components/VideoGallery/VideoGallery'
import { createPageMetadata } from '../lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const data = await getHomePageData()
  const content = mapHomePageData(data, locale)
  const title = content.hero?.title || 'Educational Portal'
  const description =
    content.hero?.description ||
    content.hero?.subtitle ||
    'Educational resources and teaching materials'

  return createPageMetadata({
    locale,
    title,
    description,
    keywords: ['освіта', 'методичні матеріали'],
    image: content.hero?.imageUrl,
  })
}

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
      <VideoGallery content={content.videoGallery} />
    </>
  )
}

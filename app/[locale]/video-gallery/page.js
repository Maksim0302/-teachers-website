import { getVideoGalleryData, mapVideoGalleryData } from '@/sanity/lib/queries'
import VideoGalleryPageContent from './components/VideoGalleryPageContent'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'video-gallery', content: mapVideoGalleryData(await getVideoGalleryData(), locale), fallbackTitle: 'Video Gallery', fallbackDescription: 'Watch our collection of educational videos', keywords: ['відеогалерея', 'освітні відео'] })
}

export default async function VideoGalleryPage({ params }) {
  const { locale } = await params
  const videoGalleryData = await getVideoGalleryData()
  const content = mapVideoGalleryData(videoGalleryData, locale)

  return <VideoGalleryPageContent content={content} />
}

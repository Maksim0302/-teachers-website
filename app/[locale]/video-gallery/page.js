import { getVideoGalleryData, mapVideoGalleryData } from '@/sanity/lib/queries'
import VideoGalleryPageContent from './components/VideoGalleryPageContent'

export const metadata = {
  title: 'Video Gallery',
  description: 'Watch our collection of educational videos',
}

export default async function VideoGalleryPage({ params }) {
  const { locale } = await params
  const videoGalleryData = await getVideoGalleryData()
  const content = mapVideoGalleryData(videoGalleryData, locale)

  return <VideoGalleryPageContent content={content} />
}

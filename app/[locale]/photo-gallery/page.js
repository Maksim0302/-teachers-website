import { getPhotoGalleryData, mapPhotoGalleryData } from '@/sanity/lib/queries'
import PhotoGallery from '@/app/components/PhotoGallery/PhotoGallery'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'photo-gallery', content: mapPhotoGalleryData(await getPhotoGalleryData(), locale), fallbackTitle: 'Photo Gallery', fallbackDescription: 'Browse our photo gallery', keywords: ['фотогалерея'] })
}

export default async function PhotoGalleryPage({ params }) {
  const { locale } = await params
  const photoGalleryData = await getPhotoGalleryData()
  const content = mapPhotoGalleryData(photoGalleryData, locale)

  return <PhotoGallery content={content} />
}

import { getPhotoGalleryData, mapPhotoGalleryData } from '@/sanity/lib/queries'
import PhotoGallery from '@/app/components/PhotoGallery/PhotoGallery'

export const metadata = {
  title: 'Photo Gallery',
  description: 'Browse our photo gallery',
}

export default async function PhotoGalleryPage({ params }) {
  const { locale } = await params
  const photoGalleryData = await getPhotoGalleryData()
  const content = mapPhotoGalleryData(photoGalleryData, locale)

  return <PhotoGallery content={content} />
}

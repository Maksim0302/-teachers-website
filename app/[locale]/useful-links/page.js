import { getUsefulLinksData, mapUsefulLinksData } from '@/sanity/lib/queries'
import UsefulLinks from '@/app/components/UsefulLinks/UsefulLinks'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'useful-links', content: mapUsefulLinksData(await getUsefulLinksData(), locale), fallbackTitle: 'Useful Links', fallbackDescription: 'Browse our collection of useful links and resources', keywords: ['корисні посилання'] })
}

export default async function UsefulLinksPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const usefulLinksData = await getUsefulLinksData()
  const content = mapUsefulLinksData(usefulLinksData, locale)

  return <UsefulLinks content={content} />
}

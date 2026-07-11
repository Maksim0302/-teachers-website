import { getUsefulLinksData, mapUsefulLinksData } from '@/sanity/lib/queries'
import UsefulLinks from '@/app/components/UsefulLinks/UsefulLinks'

export const metadata = {
  title: 'Useful Links | Educational Portal',
  description: 'Browse our collection of useful links and resources',
}

export default async function UsefulLinksPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const usefulLinksData = await getUsefulLinksData()
  const content = mapUsefulLinksData(usefulLinksData, locale)

  return (
    <div>
      <UsefulLinks content={content} />
    </div>
  )
}

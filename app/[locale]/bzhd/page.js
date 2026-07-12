import { getBzhdData, mapBzhdData } from '@/sanity/lib/queries'
import BZHD from '@/app/components/BZHD/BZHD'

export const metadata = {
  title: 'БЖД | Educational Portal',
  description: 'Safety and Health resources',
}

export default async function BZHDPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const bzhdData = await getBzhdData()
  const content = mapBzhdData(bzhdData, locale)

  return (
    <div>
      <BZHD content={content} />
    </div>
  )
}

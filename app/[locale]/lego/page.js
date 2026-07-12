import { getLegoData, mapLegoData } from '@/sanity/lib/queries'
import Lego from '@/app/components/Lego/Lego'

export const metadata = {
  title: 'LEGO - конструювання | Educational Portal',
  description: 'LEGO construction and learning resources',
}

export default async function LegoPage({ params }) {
  const { locale } = await params

  const legoData = await getLegoData()
  const content = mapLegoData(legoData, locale)

  return (
    <div>
      <Lego content={content} />
    </div>
  )
}

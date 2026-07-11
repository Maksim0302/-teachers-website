import { getNushData, mapNushData } from '@/sanity/lib/queries'
import Nush from '@/app/components/Nush/Nush'

export const metadata = {
  title: 'НУШ | Educational Portal',
  description: 'Nova Ukrainska Shkola (NUŠ) documents',
}

export default async function NushPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const nushData = await getNushData()
  const content = mapNushData(nushData, locale)

  return (
    <div>
      <Nush content={content} />
    </div>
  )
}

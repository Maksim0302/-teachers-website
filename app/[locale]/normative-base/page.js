import {
  getNormativeBaseData,
  mapNormativeBaseData,
} from '@/sanity/lib/queries'
import NormativeBase from '@/app/components/NormativeBase/NormativeBase'

export const metadata = {
  title: 'Normative Base | Educational Portal',
  description:
    'Access normative and regulatory documents for our educational institution',
}

export default async function NormativeBasePage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const normativeBaseData = await getNormativeBaseData()
  const content = mapNormativeBaseData(normativeBaseData, locale)

  return (
    <div>
      <NormativeBase content={content} />
    </div>
  )
}

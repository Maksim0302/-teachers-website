import { getPortfolioData, mapPortfolioData } from '@/sanity/lib/queries'
import Portfolio from '@/app/components/Portfolio/Portfolio'

export const metadata = {
  title: 'Portfolio | Educational Portal',
  description: 'Browse our portfolio documents',
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const portfolioData = await getPortfolioData()
  const content = mapPortfolioData(portfolioData, locale)

  return (
    <div>
      <Portfolio content={content} />
    </div>
  )
}

import { getPortfolioData, mapPortfolioData } from '@/sanity/lib/queries'
import Portfolio from '@/app/components/Portfolio/Portfolio'
import { createContentMetadata } from '@/app/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return createContentMetadata({ locale, path: 'portfolio', content: mapPortfolioData(await getPortfolioData(), locale), fallbackTitle: 'Portfolio', fallbackDescription: 'Browse our portfolio documents', keywords: ['портфоліо вчителя'] })
}

export default async function PortfolioPage({ params }) {
  const { locale } = await params

  // Fetch data from Sanity
  const portfolioData = await getPortfolioData()
  const content = mapPortfolioData(portfolioData, locale)

  return <Portfolio content={content} />
}

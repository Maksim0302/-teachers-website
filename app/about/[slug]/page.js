import { notFound } from 'next/navigation'
import AboutPageContent from '../components/AboutPageContent'
import { aboutPages, getAboutPage } from '../data/aboutPages'

export function generateStaticParams() {
  return Object.keys(aboutPages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getAboutPage(slug)

  if (!page) {
    return { title: 'Not Found' }
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export default async function AboutDynamicPage({ params }) {
  const { slug } = await params
  const page = getAboutPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <AboutPageContent title={page.title} description={page.description} />
  )
}

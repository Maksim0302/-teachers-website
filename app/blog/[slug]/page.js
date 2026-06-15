import { notFound } from 'next/navigation'
import BlogPageContent from '../components/BlogPageContent'
import { blogPages, getBlogPage } from '../data/blogPages'

export function generateStaticParams() {
  return Object.keys(blogPages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getBlogPage(slug)

  if (!page) {
    return { title: 'Not Found' }
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export default async function BlogDynamicPage({ params }) {
  const { slug } = await params
  const page = getBlogPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <BlogPageContent title={page.title} description={page.description} />
  )
}

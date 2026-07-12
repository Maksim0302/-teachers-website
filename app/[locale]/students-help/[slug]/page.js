import { notFound } from 'next/navigation'
import GraduatesPageContent from '../../../graduates/components/GraduatesPageContent'
import {
  getAllStudentSubjectSlugs,
  getStudentSubjectPage,
} from '../../../students-help/data/studentSubjectsPages'

// Use ISR (Incremental Static Regeneration) - revalidate every 10 seconds
export const revalidate = 10

export async function generateStaticParams() {
  try {
    const slugs = await getAllStudentSubjectSlugs()
    const locales = ['en', 'ru', 'uk']

    const params = []
    for (const locale of locales) {
      for (const slug of slugs) {
        params.push({ locale, slug })
      }
    }

    return params
  } catch (error) {
    console.error(
      'Failed to generate static params for localized student subjects:',
      error
    )
    return []
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug, locale } = await params
    const page = await getStudentSubjectPage(slug, locale)

    if (!page) {
      return { title: 'Not Found' }
    }

    return {
      title: `${page.title} | На допомогу учням`,
      description: page.subtitle || `Subject ${slug}`,
    }
  } catch (error) {
    console.error(
      'Failed to generate metadata for localized student subject page:',
      error
    )
    return { title: 'На допомогу учням' }
  }
}

export default async function LocalizedStudentSubjectPage({ params }) {
  try {
    const { slug, locale } = await params

    if (!slug || !locale) {
      console.error('Missing slug or locale:', { slug, locale })
      notFound()
    }

    const page = await getStudentSubjectPage(slug, locale)

    if (!page) {
      console.warn(`Student subject page not found: ${slug} (${locale})`)
      notFound()
    }

    return (
      <GraduatesPageContent
        title={page.title}
        subtitle={page.subtitle}
        description={page.description}
        photos={page.photos}
      />
    )
  } catch (error) {
    console.error('Error loading localized student subject page:', error)
    notFound()
  }
}

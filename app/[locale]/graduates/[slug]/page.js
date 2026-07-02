import { notFound } from 'next/navigation'
import GraduatesPageContent from '../../../graduates/components/GraduatesPageContent'
import {
  getAllGraduateYears,
  getGraduatePage,
} from '../../../graduates/data/graduatesPages'

// Use ISR (Incremental Static Regeneration) - revalidate every 10 seconds
export const revalidate = 10

export async function generateStaticParams() {
  try {
    const years = await getAllGraduateYears()
    const locales = ['en', 'ru', 'uk']

    const params = []
    for (const locale of locales) {
      for (const year of years) {
        params.push({ locale, slug: year })
      }
    }

    return params
  } catch (error) {
    console.error(
      'Failed to generate static params for localized graduates:',
      error
    )
    return []
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug, locale } = await params
    const page = await getGraduatePage(slug, locale)

    if (!page) {
      return { title: 'Not Found' }
    }

    return {
      title: `${page.title} | Graduates`,
      description: page.subtitle || `Graduation ${slug}`,
    }
  } catch (error) {
    console.error(
      'Failed to generate metadata for localized graduates page:',
      error
    )
    return { title: 'Graduates' }
  }
}

export default async function LocalizedGraduatePage({ params }) {
  try {
    const { slug, locale } = await params
    
    if (!slug || !locale) {
      console.error('Missing slug or locale:', { slug, locale })
      notFound()
    }

    const page = await getGraduatePage(slug, locale)

    if (!page) {
      console.warn(`Graduate page not found: ${slug} (${locale})`)
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
    console.error('Error loading localized graduates page:', error)
    notFound()
  }
}

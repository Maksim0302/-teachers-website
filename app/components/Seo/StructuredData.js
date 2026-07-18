import { jsonLd, localizedPath, siteUrl } from '@/app/lib/seo'

export function StructuredData({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  )
}

export function BreadcrumbStructuredData({ locale, items }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: new URL(localizedPath(locale, item.path), siteUrl).toString(),
        })),
      }}
    />
  )
}

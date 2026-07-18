import { getAllGraduateYears } from '@/app/graduates/data/graduatesPages'
import { getAllStudentSubjectSlugs } from '@/app/students-help/data/studentSubjectsPages'
import { locales, localizedPath, siteUrl } from './lib/seo'

const staticPaths = ['', 'about', 'parents', 'my-achievements', 'calendar-thematic-planning', 'photo-gallery', 'normative-base', 'future-first-graders', 'nush', 'video-gallery', 'presentations-for-lessons', 'portfolio', 'our-achievements', 'useful-links', 'lego', 'bzhd']

const entry = (path) => ({
  url: new URL(path, siteUrl).toString(),
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: path.split('/').filter(Boolean).length === 1 ? 1 : 0.7,
})

export default async function sitemap() {
  const [graduateYears, subjectSlugs] = await Promise.all([
    getAllGraduateYears(),
    getAllStudentSubjectSlugs(),
  ])
  const paths = locales.flatMap((locale) => [
    ...staticPaths.map((path) => localizedPath(locale, path)),
    ...graduateYears.map((year) => localizedPath(locale, `graduates/${year}`)),
    ...subjectSlugs.filter(Boolean).map((slug) => localizedPath(locale, `students-help/${slug}`)),
  ])

  return paths.map(entry)
}

export const blogPages = {
  latest: {
    title: 'Latest Posts',
    description:
      'Read our most recent articles, tips, and insights for educators.',
  },
  archive: {
    title: 'Archive',
    description:
      'Browse our full collection of past blog posts and resources.',
  },
}

export const blogIndexPage = {
  title: 'All Posts',
  description:
    'Explore articles, guides, and stories created for teachers and education professionals.',
}

export function getBlogPage(slug) {
  return blogPages[slug] ?? null
}

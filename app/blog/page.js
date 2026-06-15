import React from 'react'
import BlogPageContent from './components/BlogPageContent'
import { blogIndexPage } from './data/blogPages'

export const metadata = {
  title: blogIndexPage.title,
  description: blogIndexPage.description,
}

const Blog = () => {
  return (
    <BlogPageContent
      title={blogIndexPage.title}
      description={blogIndexPage.description}
    />
  )
}

export default Blog

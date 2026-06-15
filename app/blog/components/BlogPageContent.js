import React from 'react'

const BlogPageContent = ({ title, description, children }) => {
  return (
    <section className="blog-page">
      <div className="container">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  )
}

export default BlogPageContent

import React from 'react'

const AboutPageContent = ({ title, description, children }) => {
  return (
    <section className="about-page">
      <div className="container">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {children}
      </div>
    </section>
  )
}

export default AboutPageContent

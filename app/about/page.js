import React from 'react'
import AboutPageContent from './components/AboutPageContent'
import { aboutUsPage } from './data/aboutPages'

export const metadata = {
  title: aboutUsPage.title,
  description: aboutUsPage.description,
}

const AboutUs = () => {
  return (
    <AboutPageContent
      title={aboutUsPage.title}
      description={aboutUsPage.description}
    />
  )
}

export default AboutUs

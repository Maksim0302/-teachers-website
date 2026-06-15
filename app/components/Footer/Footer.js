'use client'
import React from 'react'
import './Footer.scss'
import { useTranslations } from 'next-intl'

const Footer = () => {
  return (
    <section className="footer" id="contact">
      <div className="container">
        <div className="footer__content"></div>
        <span>
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </span>
      </div>
    </section>
  )
}

export default Footer

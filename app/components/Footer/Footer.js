'use client'
import React from 'react'
import './Footer.scss'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')

  return <section className="footer"></section>
}

export default Footer

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa'
import './Footer.scss'

const sections = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Photo Gallery', href: '/photo-gallery' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Articles', href: '#articles' },
  { label: 'Contact', href: '#contact' },
]

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__content">
          <div className="footer__column footer__column--brand">
            <Link href="/" className="footer__logo">
              <Image
                src="/img/logo/logo.jpg"
                width={70}
                height={70}
                alt="Educational Portal Logo"
              />
              <span>Educational Portal</span>
            </Link>

            <p className="footer__description">
              A modern educational platform for students, parents, and
              colleagues. Stay informed with the latest news, articles, and
              educational resources.
            </p>

            <div className="footer__socials">
              <a
                href="https://youtube.com/@БилыкИрина-г1х"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.facebook.com/share/19DLzW7d6C/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h3>Contact</h3>

            <div className="footer__info">
              <span className="footer__label">Email</span>
              <a href="mailto:teacher@example.com">
                bilykira19770329@gmail.com
              </a>
            </div>

            <div className="footer__info">
              <span className="footer__label">School Address</span>
              <p>123 Education Street, School City</p>
            </div>
          </div>

          <div className="footer__column">
            <h3>Sections</h3>

            <ul className="footer__links">
              {sections.map((section) => (
                <li key={section.href}>
                  <Link href={section.href}>{section.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Educational Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

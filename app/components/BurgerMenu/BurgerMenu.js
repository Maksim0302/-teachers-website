'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './BurgerMenu.scss'

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      submenu: [
        { label: 'Home Page', href: '/' },
        { label: 'Introduction', href: '/home/intro' },
      ],
    },
    {
      id: 'about',
      label: 'About',
      submenu: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about/team' },
        { label: 'History', href: '/about/history' },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      submenu: [
        { label: 'All Services', href: '/services' },
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'Development', href: '/services/development' },
      ],
    },
    {
      id: 'blog',
      label: 'Blog',
      submenu: [
        { label: 'All Posts', href: '/blog' },
        { label: 'Latest', href: '/blog/latest' },
        { label: 'Archive', href: '/blog/archive' },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      submenu: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Support', href: '/contact/support' },
      ],
    },
  ]

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className={`burger ${isMenuOpen ? 'burger--open' : ''}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`burger__menu ${isMenuOpen ? 'burger__menu--open' : ''}`}>
        {menuItems.map((item) => (
          <div key={item.id} className="burger__accordion-item">
            <button
              type="button"
              className={`burger__accordion-trigger ${
                expandedId === item.id ? 'burger__accordion-trigger--open' : ''
              }`}
              onClick={() => toggleAccordion(item.id)}
              aria-expanded={expandedId === item.id}
            >
              {item.label}
              <span className="burger__accordion-icon" />
            </button>
            {expandedId === item.id && (
              <div className="burger__submenu">
                {item.submenu.map((subitem, index) => (
                  <Link
                    key={index}
                    href={subitem.href}
                    className="burger__submenu-link"
                    onClick={handleLinkClick}
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

export default BurgerMenu

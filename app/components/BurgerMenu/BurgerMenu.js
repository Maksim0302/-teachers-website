'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { fetchMenuAction } from '@/app/actions/menu'
import './BurgerMenu.scss'

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true)
        const { menuItems: items, error } = await fetchMenuAction(locale)
        if (error) {
          console.error('Error fetching menu:', error)
          setMenuItems([])
        } else {
          setMenuItems(items || [])
        }
      } catch (error) {
        console.error('Error fetching menu:', error)
        setMenuItems([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [locale])

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
        {isLoading ? (
          <div className="burger__loading">Loading menu...</div>
        ) : menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="burger__accordion-item">
              {item.children && item.children.length > 0 ? (
                // Accordion item
                <>
                  <button
                    type="button"
                    className={`burger__accordion-trigger ${
                      expandedId === item.id
                        ? 'burger__accordion-trigger--open'
                        : ''
                    }`}
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={expandedId === item.id}
                  >
                    {item.label}
                    <span className="burger__accordion-icon" />
                  </button>
                  {expandedId === item.id && (
                    <div className="burger__submenu">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className="burger__submenu-link"
                          onClick={handleLinkClick}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // Regular link
                <Link
                  href={item.href}
                  className="burger__accordion-trigger burger__accordion-trigger--link"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))
        ) : (
          <div className="burger__empty">No menu items</div>
        )}
      </nav>
    </>
  )
}

export default BurgerMenu

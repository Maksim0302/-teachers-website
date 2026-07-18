'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { fetchMenuAction } from '@/app/actions/menu'
import './BurgerMenu.scss'

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const locale = useLocale()
  const pathname = usePathname()

  // Refs для отслеживания элементов меню и кнопки
  const menuRef = useRef(null)
  const burgerButtonRef = useRef(null)

  // Загрузка данных меню при изменении locale
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

  // Закрытие меню при изменении маршрута (pathname)
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      setExpandedId(null)
    }
  }, [pathname])

  // Обработчик закрытия меню при клике вне меню (overlay click)
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event) => {
      // Проверяем, что клик произошел вне меню и вне кнопки бургер-меню
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerButtonRef.current &&
        !burgerButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
        setExpandedId(null)
      }
    }

    // Добавляем слушатель на document
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      // Очищаем слушатель при размонтировании или закрытии меню
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isMenuOpen])

  // Обработчик закрытия меню при нажатии клавиши Escape
  useEffect(() => {
    if (!isMenuOpen) return

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsMenuOpen(false)
        setExpandedId(null)
      }
    }

    // Добавляем слушатель на document
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      // Очищаем слушатель при размонтировании или закрытии меню
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen])

  // Переключение аккордеона
  const toggleAccordion = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  // Обработчик клика на ссылку - закрывает меню
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false)
    setExpandedId(null)
  }, [])

  // Обработчик нажатия на кнопку бургер-меню
  const handleToggleBurger = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  return (
    <>
      {/* Кнопка открытия/закрытия меню (бургер-иконка) */}
      <button
        ref={burgerButtonRef}
        type="button"
        className={`burger ${isMenuOpen ? 'burger--open' : ''}`}
        onClick={handleToggleBurger}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Само меню навигации */}
      <nav 
        ref={menuRef}
        className={`burger__menu ${isMenuOpen ? 'burger__menu--open' : ''}`}
      >
        {/* Содержимое меню */}
        {isLoading ? (
          <div className="burger__loading">Loading menu...</div>
        ) : menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="burger__accordion-item">
              {item.children && item.children.length > 0 ? (
                // Аккордеон с подменю
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
                // Простая ссылка без подменю
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

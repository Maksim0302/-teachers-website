'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import './LangSwitcher.scss'

const languages = [
  { label: 'English', code: 'en' },
  { label: 'Русский', code: 'ru' },
  { label: 'Українська', code: 'uk' },
]

const LangSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const containerRef = useRef(null)

  const router = useRouter()
  const pathname = usePathname() || '/'
  const locale = useLocale()

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const getLocalizedPath = (newLocale) => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length > 0 && /^[a-z]{2}$/.test(segments[0])) {
      segments[0] = newLocale
    } else {
      segments.unshift(newLocale)
    }

    return `/${segments.join('/')}`
  }

  const selectLanguage = (language) => {
    if (language.code === locale) {
      setIsOpen(false)
      return
    }

    startTransition(() => {
      router.replace(getLocalizedPath(language.code))
    })
    setIsOpen(false)
  }

  return (
    <div className="language-selector" ref={containerRef}>
      <button
        type="button"
        className="language-selector__current"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="language-selector__label">{currentLanguage.label}</span>
        <span
          className={`language-selector__arrow ${
            isOpen ? 'language-selector__arrow--up' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="language-selector__dropdown" role="listbox">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              role="option"
              aria-selected={language.code === locale}
              className={`language-selector__item ${
                language.code === locale ? 'language-selector__item--active' : ''
              }`}
              onClick={() => selectLanguage(language)}
              disabled={isPending}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LangSwitcher

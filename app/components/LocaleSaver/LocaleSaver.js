'use client'

import { useEffect } from 'react'

const LocaleSaver = ({ locale }) => {
  useEffect(() => {
    // Сохраняем текущий язык в cookie при загрузке
    if (locale) {
      const expirationDate = new Date()
      expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      document.cookie = `NEXT_LOCALE=${locale}; path=/; expires=${expirationDate.toUTCString()}`
    }
  }, [locale])

  return null
}

export default LocaleSaver

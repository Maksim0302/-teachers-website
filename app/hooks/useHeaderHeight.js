'use client'

import { useEffect, useRef } from 'react'

export function useHeaderHeight() {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeight = () => {
      const height = header.offsetHeight
      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      )
    }

    // Initial height
    updateHeight()

    // Watch for changes in header height
    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })

    resizeObserver.observe(header)

    // Also listen to window resize
    window.addEventListener('resize', updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return headerRef
}

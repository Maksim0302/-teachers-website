'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import './globals.scss'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="page-error">
      <div className="page-error__text">
        <div className="page-error__text-number"><h1>500</h1></div>
        <div className="page-error__text-desc"><h2>Something went wrong</h2></div>
      </div>
      <div className="page-error__button">
        <button type="button" className="page-error__btn" onClick={reset}>Try again</button>
        <Link href="/en" className="page-error__btn">Home page</Link>
      </div>
    </main>
  )
}

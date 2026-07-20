'use client'
import Link from 'next/link'
import Image from 'next/image'
import './globals.scss'

export default function NotFound() {
  return (
    <html>
      <body className="page-error">
        <div className="page-error__logo">
          <Link href="/" className="logo">
            <Image
              src="/img/logo/logo_new.png"
              width={90}
              height={90}
              alt="logo"
            />
          </Link>
        </div>
        <div className="page-error__text">
          <div className="page-error__text-number">
            <h1>404</h1>
          </div>
          <div className="page-error__text-desc">
            <h2>Sorry, page not found</h2>
          </div>
        </div>
        <div className="page-error__button">
          <Link href="/" className="page-error__btn">
            <span>Home page</span>
          </Link>
        </div>
      </body>
    </html>
  )
}

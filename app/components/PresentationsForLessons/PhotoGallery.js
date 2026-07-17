'use client'

import { useState, useEffect } from 'react'
import './PhotoGallery.scss'

export default function PhotoGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const isOpen = selectedIndex !== null

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleClose = () => {
    setSelectedIndex(null)
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return
    if (e.key === 'ArrowRight') handleNext()
    else if (e.key === 'ArrowLeft') handlePrev()
    else if (e.key === 'Escape') handleClose()
  }

  if (isOpen) {
    typeof document !== 'undefined' &&
      document.addEventListener('keydown', handleKeyDown)

    return (
      <>
        <div className="photo-gallery__grid">
          {images.map((item, index) => (
            <div
              key={index}
              className="photo-gallery__thumbnail"
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedIndex(index)
                }
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.alt || `Gallery image ${index + 1}`}
                className="photo-gallery__image"
              />
            </div>
          ))}
        </div>

        <div className="photo-gallery__modal" onClick={handleClose}>
          <div
            className="photo-gallery__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="photo-gallery__close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="photo-gallery__main-image">
              <img
                src={images[selectedIndex].imageUrl}
                alt={
                  images[selectedIndex].alt ||
                  `Gallery image ${selectedIndex + 1}`
                }
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="photo-gallery__arrow photo-gallery__arrow--prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  ❮
                </button>
                <button
                  className="photo-gallery__arrow photo-gallery__arrow--next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  ❯
                </button>

                <div className="photo-gallery__counter">
                  {selectedIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="photo-gallery__grid">
      {images.map((item, index) => (
        <div
          key={index}
          className="photo-gallery__thumbnail"
          onClick={() => setSelectedIndex(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedIndex(index)
            }
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.alt || `Gallery image ${index + 1}`}
            className="photo-gallery__image"
          />
        </div>
      ))}
    </div>
  )
}

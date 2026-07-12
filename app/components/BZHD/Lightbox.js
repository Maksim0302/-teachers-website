'use client'

import React, { useEffect } from 'react'

const Lightbox = ({ photos, currentIndex, onClose, onPrevious, onNext }) => {
  const currentPhoto = photos[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onPrevious()
      } else if (e.key === 'ArrowRight') {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose, onPrevious, onNext])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="bzhd__lightbox" onClick={handleBackdropClick}>
      <button
        className="bzhd__lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      <button
        className="bzhd__lightbox-nav bzhd__lightbox-nav--prev"
        onClick={onPrevious}
        aria-label="Previous image"
      >
        ‹
      </button>

      <div className="bzhd__lightbox-content">
        <img
          src={currentPhoto.imageUrlFull}
          alt={currentPhoto.alt}
          className="bzhd__lightbox-image"
        />
        {currentPhoto.caption && (
          <p className="bzhd__lightbox-caption">{currentPhoto.caption}</p>
        )}
        <p className="bzhd__lightbox-counter">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>

      <button
        className="bzhd__lightbox-nav bzhd__lightbox-nav--next"
        onClick={onNext}
        aria-label="Next image"
      >
        ›
      </button>

      <div className="bzhd__lightbox-thumbnails">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`bzhd__lightbox-thumbnail ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => {
              // Navigate to the clicked thumbnail
              // This is handled by parent component
            }}
            aria-label={`Go to image ${index + 1}`}
          >
            <img src={photo.imageUrl} alt={photo.alt} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Lightbox

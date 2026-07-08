'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const PhotoGalleryLightbox = ({
  photos,
  selectedPhotoIndex,
  onClose,
  onPrevPhoto,
  onNextPhoto,
}) => {
  const currentPhoto = photos[selectedPhotoIndex]
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setIsVisible(true)

    // Handle keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onPrevPhoto()
      } else if (e.key === 'ArrowRight') {
        onNextPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onPrevPhoto, onNextPhoto])

  if (!currentPhoto) return null

  return (
    <div
      className={`photo-gallery-lightbox ${
        isVisible ? 'photo-gallery-lightbox--visible' : ''
      }`}
      onClick={onClose}
      role="dialog"
      aria-label="Photo lightbox"
    >
      {/* Backdrop */}
      <div className="photo-gallery-lightbox__backdrop" onClick={onClose}></div>

      {/* Content */}
      <div
        className="photo-gallery-lightbox__content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="photo-gallery-lightbox__close"
          onClick={onClose}
          aria-label="Close lightbox"
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            className="photo-gallery-lightbox__nav photo-gallery-lightbox__nav--prev"
            onClick={onPrevPhoto}
            aria-label="Previous photo"
            title="Previous (←)"
          >
            ‹
          </button>
        )}

        {/* Image Container */}
        <div className="photo-gallery-lightbox__image-container">
          <div className="photo-gallery-lightbox__image-wrapper">
            <Image
              src={currentPhoto.imageUrlFull}
              alt={currentPhoto.alt || 'Photo'}
              fill
              className="photo-gallery-lightbox__image"
              sizes="(max-width: 768px) 100vw, 90vw"
              quality={95}
              priority
            />
          </div>
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            className="photo-gallery-lightbox__nav photo-gallery-lightbox__nav--next"
            onClick={onNextPhoto}
            aria-label="Next photo"
            title="Next (→)"
          >
            ›
          </button>
        )}

        {/* Caption and Counter */}
        <div className="photo-gallery-lightbox__footer">
          {currentPhoto.caption && (
            <p className="photo-gallery-lightbox__caption">
              {currentPhoto.caption}
            </p>
          )}
          {photos.length > 1 && (
            <div className="photo-gallery-lightbox__counter">
              {selectedPhotoIndex + 1} / {photos.length}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotoGalleryLightbox

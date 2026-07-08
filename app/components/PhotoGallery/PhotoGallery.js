'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import './PhotoGallery.scss'

const PhotoGallery = ({ content }) => {
  const t = useTranslations('PhotoGallery')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''
  const photos = content?.photos || []

  // Debug logging
  if (!title) {
    console.warn('PhotoGallery: Missing title', {
      title,
      subtitle,
      photos: photos?.length || 0,
    })
  }

  // Manage body overflow when modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPhotoIndex])

  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedPhotoIndex(null)
  }

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto()
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto()
      }
    }

    if (selectedPhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedPhotoIndex, photos.length])

  return (
    <>
      <section className="photo-gallery">
        <div className="container">
          <div className="photo-gallery__header">
            <h1 className="photo-gallery__title">{title}</h1>
            {subtitle && <p className="photo-gallery__subtitle">{subtitle}</p>}
          </div>

          {photos && photos.length > 0 ? (
            <div className="photo-gallery__gallery">
              {photos.map((photo, index) => (
                <div
                  key={photo.id || index}
                  className="photo-gallery__photo-item"
                  onClick={() => handlePhotoClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePhotoClick(index)
                    }
                  }}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.alt || `Photo ${index + 1}`}
                    className="photo-gallery__photo"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999' }}>
              {t('noPhotos')}
            </p>
          )}
        </div>
      </section>

      {/* Modal for full-size photo */}
      {selectedPhotoIndex !== null && (
        <div className="photo-gallery-modal" onClick={handleModalBackdropClick}>
          <div className="photo-gallery-modal__content">
            <button
              className="photo-gallery-modal__close"
              onClick={handleCloseModal}
              aria-label="Close photo modal"
              title="Close (Esc)"
            >
              ✕
            </button>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  className="photo-gallery-modal__nav photo-gallery-modal__nav--prev"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  title="Previous (← arrow)"
                >
                  ‹
                </button>
                <button
                  className="photo-gallery-modal__nav photo-gallery-modal__nav--next"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  title="Next (→ arrow)"
                >
                  ›
                </button>
              </>
            )}

            {/* Photo counter */}
            {photos.length > 1 && (
              <div className="photo-gallery-modal__counter">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            )}

            <img
              src={photos[selectedPhotoIndex].imageUrlFull}
              alt={photos[selectedPhotoIndex].alt || 'Photo'}
              className="photo-gallery-modal__image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery

'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import './PhotoGallery.scss'

const PhotoGallery = ({ content }) => {
  const t = useTranslations('PhotoGallery')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

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
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
  }

  const handleCloseModal = () => {
    setSelectedPhoto(null)
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
      }
    }

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedPhoto])

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
                  onClick={() => handlePhotoClick(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePhotoClick(photo)
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
      {selectedPhoto && (
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
            <img
              src={selectedPhoto.imageUrlFull}
              alt={selectedPhoto.alt || 'Photo'}
              className="photo-gallery-modal__image"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGallery

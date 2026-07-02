'use client'

import React, { useState, useEffect } from 'react'
import './GraduatesPageContent.scss'

const GraduatesPageContent = ({ title, subtitle, description, photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Debug logging
  if (!title) {
    console.warn('GraduatesPageContent: Missing title', {
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

  return (
    <section className="graduates-page">
      <div className="container">
        <div className="graduates-page__header">
          <h1 className="graduates-page__title">{title || 'No Title'}</h1>
          {subtitle && <p className="graduates-page__subtitle">{subtitle}</p>}
        </div>

        {description && (
          <div className="graduates-page__description">{description}</div>
        )}

        {photos && photos.length > 0 && (
          <div className="graduates-page__gallery">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="graduates-page__photo-item"
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
                  alt={photo.alt || `Graduation photo ${index + 1}`}
                  className="graduates-page__photo"
                />
              </div>
            ))}
          </div>
        )}

        {(!photos || photos.length === 0) && (
          <p style={{ textAlign: 'center', color: '#999' }}>
            No photos available
          </p>
        )}
      </div>

      {/* Modal for full-size photo */}
      {selectedPhoto && (
        <div className="graduates-modal" onClick={handleModalBackdropClick}>
          <div className="graduates-modal__content">
            <button
              className="graduates-modal__close"
              onClick={handleCloseModal}
              aria-label="Close photo modal"
            >
              ✕
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.alt || 'Graduation photo'}
              className="graduates-modal__image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default GraduatesPageContent

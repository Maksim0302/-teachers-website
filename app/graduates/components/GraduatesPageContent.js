'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './GraduatesPageContent.scss'

const GraduatesPageContent = ({ title, subtitle, description, photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

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
              <button
                type="button"
                key={index}
                className="graduates-page__photo-item"
                onClick={() => handlePhotoClick(index)}
                aria-label={`${photo.alt || `Graduation photo ${index + 1}`}: open full size`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.alt || `Graduation photo ${index + 1}`}
                  className="graduates-page__photo"
                  width={1800}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </button>
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
      {selectedPhotoIndex !== null && (
        <div className="graduates-modal" onClick={handleModalBackdropClick}>
          <div className="graduates-modal__content">
            <button
              className="graduates-modal__close"
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
                  className="graduates-modal__nav graduates-modal__nav--prev"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  title="Previous (← arrow)"
                >
                  ‹
                </button>
                <button
                  className="graduates-modal__nav graduates-modal__nav--next"
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
              <div className="graduates-modal__counter">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            )}

            <Image
              src={photos[selectedPhotoIndex].imageUrl}
              alt={photos[selectedPhotoIndex].alt || 'Graduation photo'}
              className="graduates-modal__image"
              width={1800}
              height={1200}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default GraduatesPageContent

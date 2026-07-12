'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import './BZHD.scss'
import DocumentCard from './DocumentCard'
import Lightbox from './Lightbox'

const BZHD = ({ content }) => {
  const t = useTranslations('BZHD')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''
  const documents = content?.documents || []
  const photos = content?.photos || []

  // Debug logging
  if (!title) {
    console.warn('BZHD: Missing title', {
      title,
      subtitle,
      documents: documents?.length || 0,
      photos: photos?.length || 0,
    })
  }

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bzhd">
      <div className="container">
        {/* Header Section */}
        <div className="bzhd__header">
          <h1 className="bzhd__title">{title}</h1>
          {subtitle && <p className="bzhd__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="bzhd__documents-section">
            <h2 className="bzhd__section-title">{t('documentsTitle')}</h2>
            <div className="bzhd__documents-list">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} document={doc} t={t} />
              ))}
            </div>
          </div>
        )}

        {/* Photo Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="bzhd__gallery-section">
            <h2 className="bzhd__section-title">{t('galleryTitle')}</h2>
            <div className="bzhd__gallery-grid">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="bzhd__gallery-item"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') openLightbox(index)
                  }}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.alt}
                    className="bzhd__gallery-image"
                    loading="lazy"
                  />
                  {photo.caption && (
                    <div className="bzhd__gallery-caption">{photo.caption}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {documents.length === 0 && photos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            {t('noContent')}
          </p>
        )}
      </div>

      {/* Lightbox Component */}
      {lightboxOpen && photos.length > 0 && (
        <Lightbox
          photos={photos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </section>
  )
}

export default BZHD

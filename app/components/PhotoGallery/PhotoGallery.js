'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import PhotoGalleryLightbox from './PhotoGalleryLightbox'
import './PhotoGallery.scss'

const PhotoGallery = ({ content }) => {
  const t = useTranslations('PhotoGallery')
  const locale = useLocale()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const [photos, setPhotos] = useState([])
  const [isImageLoaded, setIsImageLoaded] = useState({})

  // Use content passed from server
  useEffect(() => {
    if (content?.photos) {
      setPhotos(content.photos)
    }
  }, [content])

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''

  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index)
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    )
  }

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleImageLoad = (photoId) => {
    setIsImageLoaded((prev) => ({
      ...prev,
      [photoId]: true,
    }))
  }

  return (
    <>
      <section className="photo-gallery">
        <div className="container photo-gallery__container">
          {/* Title */}
          <div className="photo-gallery__header">
            <h1 className="photo-gallery__title">{title}</h1>
            {subtitle && <p className="photo-gallery__subtitle">{subtitle}</p>}
          </div>

          {/* Photos Grid */}
          {photos && photos.length > 0 ? (
            <div className="photo-gallery__grid">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="photo-gallery__item"
                  onClick={() => handlePhotoClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePhotoClick(index)
                    }
                  }}
                >
                  <div className="photo-gallery__image-wrapper">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt || `Photo ${index + 1}`}
                      fill
                      className={`photo-gallery__image ${
                        isImageLoaded[photo.id]
                          ? 'photo-gallery__image--loaded'
                          : ''
                      }`}
                      onLoad={() => handleImageLoad(photo.id)}
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={75}
                    />
                    <div className="photo-gallery__overlay">
                      <div className="photo-gallery__zoom-icon">🔍</div>
                    </div>
                  </div>
                  {photo.caption && (
                    <div className="photo-gallery__caption">
                      <p>{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="photo-gallery__empty">
              <p className="photo-gallery__empty-text">{t('noPhotos')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && photos.length > 0 && (
        <PhotoGalleryLightbox
          photos={photos}
          selectedPhotoIndex={selectedPhotoIndex}
          onClose={handleCloseLightbox}
          onPrevPhoto={handlePrevPhoto}
          onNextPhoto={handleNextPhoto}
        />
      )}
    </>
  )
}

export default PhotoGallery

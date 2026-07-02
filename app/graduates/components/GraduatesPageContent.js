'use client'

import React from 'react'
import './GraduatesPageContent.scss'

const GraduatesPageContent = ({ title, subtitle, description, photos }) => {
  // Debug logging
  if (!title) {
    console.warn('GraduatesPageContent: Missing title', {
      title,
      subtitle,
      photos: photos?.length || 0,
    })
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
              <div key={index} className="graduates-page__photo-item">
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
    </section>
  )
}

export default GraduatesPageContent

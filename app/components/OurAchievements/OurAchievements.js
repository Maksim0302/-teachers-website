'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './OurAchievements.scss'

export default function OurAchievements({ content }) {
  const t = useTranslations('OurAchievements')

  if (!content) {
    return (
      <div className="our-achievements">
        <div className="our-achievements__container">
          <p className="our-achievements__no-content">{t('noContent')}</p>
        </div>
      </div>
    )
  }

  const { title, subtitle, documents, gallery } = content

  const getFileIcon = (fileType) => (fileType === 'pdf' ? '📄' : '📘')
  const getFileTypeLabel = (fileType) => (fileType === 'pdf' ? 'PDF' : 'Word')

  const handlePreview = (fileUrl) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName || 'document'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="our-achievements">
      <div className="our-achievements__container">
        <div className="our-achievements__header">
          <h1 className="our-achievements__title">{title}</h1>
          {subtitle && <p className="our-achievements__subtitle">{subtitle}</p>}
        </div>

        {documents && documents.length > 0 && (
          <div className="our-achievements__documents">
            <h2 className="our-achievements__section-title">
              {t('documents')}
            </h2>
            <div className="our-achievements__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="our-achievements__document">
                  <div className="our-achievements__document-content">
                    <div className="our-achievements__document-header">
                      <span className="our-achievements__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="our-achievements__document-info">
                        <h3 className="our-achievements__document-title">
                          {doc.title}
                        </h3>
                        <p className="our-achievements__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="our-achievements__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="our-achievements__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="our-achievements__button our-achievements__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="our-achievements__button our-achievements__button--download"
                      onClick={() => handleDownload(doc.fileUrl, doc.fileName)}
                      title={t('download')}
                    >
                      {t('download')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {gallery && gallery.length > 0 && (
          <div className="our-achievements__gallery-section">
            <h2 className="our-achievements__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="our-achievements__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

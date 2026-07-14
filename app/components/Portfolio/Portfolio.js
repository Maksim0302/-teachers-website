'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './Portfolio.scss'

export default function Portfolio({ content }) {
  const t = useTranslations('Portfolio')

  if (!content) {
    return (
      <div className="portfolio">
        <div className="portfolio__container">
          <p className="portfolio__no-content">{t('noContent')}</p>
        </div>
      </div>
    )
  }

  const { title, subtitle, documents, gallery } = content

  const getFileIcon = (fileType) => {
    return fileType === 'pdf' ? '📄' : '📘'
  }

  const getFileTypeLabel = (fileType) => {
    return fileType === 'pdf' ? 'PDF' : 'Word'
  }

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
    <div className="portfolio">
      <div className="portfolio__container">
        {/* Header Section */}
        <div className="portfolio__header">
          <h1 className="portfolio__title">{title}</h1>
          {subtitle && <p className="portfolio__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="portfolio__documents">
            <h2 className="portfolio__section-title">{t('documents')}</h2>
            <div className="portfolio__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="portfolio__document">
                  <div className="portfolio__document-content">
                    <div className="portfolio__document-header">
                      <span className="portfolio__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="portfolio__document-info">
                        <h3 className="portfolio__document-title">
                          {doc.title}
                        </h3>
                        <p className="portfolio__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="portfolio__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="portfolio__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="portfolio__button portfolio__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="portfolio__button portfolio__button--download"
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

        {/* Gallery Section */}
        {gallery && gallery.length > 0 && (
          <div className="portfolio__gallery-section">
            <h2 className="portfolio__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="portfolio__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

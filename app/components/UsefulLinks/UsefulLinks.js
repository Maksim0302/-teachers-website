'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './UsefulLinks.scss'

export default function UsefulLinks({ content }) {
  const t = useTranslations('UsefulLinks')

  if (!content) {
    return (
      <div className="useful-links">
        <div className="useful-links__container">
          <p className="useful-links__no-content">{t('noContent')}</p>
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
    <div className="useful-links">
      <div className="useful-links__container">
        {/* Header Section */}
        <div className="useful-links__header">
          <h1 className="useful-links__title">{title}</h1>
          {subtitle && <p className="useful-links__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="useful-links__documents">
            <h2 className="useful-links__section-title">{t('documents')}</h2>
            <div className="useful-links__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="useful-links__document">
                  <div className="useful-links__document-content">
                    <div className="useful-links__document-header">
                      <span className="useful-links__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="useful-links__document-info">
                        <h3 className="useful-links__document-title">
                          {doc.title}
                        </h3>
                        <p className="useful-links__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="useful-links__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="useful-links__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="useful-links__button useful-links__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="useful-links__button useful-links__button--download"
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
          <div className="useful-links__gallery-section">
            <h2 className="useful-links__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="useful-links__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './FutureFirstgraders.scss'

export default function FutureFirstgraders({ content }) {
  const t = useTranslations('FutureFirstgraders')

  if (!content) {
    return (
      <div className="future-firstgraders">
        <div className="future-firstgraders__container">
          <p className="future-firstgraders__no-content">{t('noContent')}</p>
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
    <div className="future-firstgraders">
      <div className="future-firstgraders__container">
        {/* Header Section */}
        <div className="future-firstgraders__header">
          <h1 className="future-firstgraders__title">{title}</h1>
          {subtitle && (
            <p className="future-firstgraders__subtitle">{subtitle}</p>
          )}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="future-firstgraders__documents">
            <h2 className="future-firstgraders__section-title">
              {t('documents')}
            </h2>
            <div className="future-firstgraders__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="future-firstgraders__document">
                  <div className="future-firstgraders__document-content">
                    <div className="future-firstgraders__document-header">
                      <span className="future-firstgraders__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="future-firstgraders__document-info">
                        <h3 className="future-firstgraders__document-title">
                          {doc.title}
                        </h3>
                        <p className="future-firstgraders__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="future-firstgraders__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="future-firstgraders__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="future-firstgraders__button future-firstgraders__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="future-firstgraders__button future-firstgraders__button--download"
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
          <div className="future-firstgraders__gallery-section">
            <h2 className="future-firstgraders__section-title">
              {t('gallery')}
            </h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="future-firstgraders__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

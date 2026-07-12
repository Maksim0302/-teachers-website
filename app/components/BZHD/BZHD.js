'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from '../Lego/PhotoGallery'
import './BZHD.scss'

export default function BZHD({ content }) {
  const t = useTranslations('BZHD')

  if (!content) {
    return (
      <div className="bzhd">
        <div className="bzhd__container">
          <p className="bzhd__no-content">{t('noContent')}</p>
        </div>
      </div>
    )
  }

  const { title, subtitle, documents, photos } = content

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
    <div className="bzhd">
      <div className="bzhd__container">
        {/* Header Section */}
        <div className="bzhd__header">
          <h1 className="bzhd__title">{title}</h1>
          {subtitle && <p className="bzhd__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="bzhd__documents">
            <h2 className="bzhd__section-title">{t('documentsTitle')}</h2>
            <div className="bzhd__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="bzhd__document">
                  <div className="bzhd__document-content">
                    <div className="bzhd__document-header">
                      <span className="bzhd__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="bzhd__document-info">
                        <h3 className="bzhd__document-title">{doc.title}</h3>
                        <p className="bzhd__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="bzhd__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="bzhd__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="bzhd__button bzhd__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="bzhd__button bzhd__button--download"
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
        {photos && photos.length > 0 && (
          <div className="bzhd__gallery-section">
            <h2 className="bzhd__section-title">{t('galleryTitle')}</h2>
            <PhotoGallery images={photos} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!photos || photos.length === 0) && (
            <p className="bzhd__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './Nush.scss'

export default function Nush({ content }) {
  const t = useTranslations('Nush')

  if (!content) {
    return (
      <div className="nush">
        <div className="nush__container">
          <p className="nush__no-content">{t('noContent')}</p>
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
    <div className="nush">
      <div className="nush__container">
        {/* Header Section */}
        <div className="nush__header">
          <h1 className="nush__title">{title}</h1>
          {subtitle && <p className="nush__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="nush__documents">
            <h2 className="nush__section-title">{t('documents')}</h2>
            <div className="nush__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="nush__document">
                  <div className="nush__document-content">
                    <div className="nush__document-header">
                      <span className="nush__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="nush__document-info">
                        <h3 className="nush__document-title">{doc.title}</h3>
                        <p className="nush__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="nush__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="nush__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="nush__button nush__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="nush__button nush__button--download"
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
          <div className="nush__gallery-section">
            <h2 className="nush__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="nush__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

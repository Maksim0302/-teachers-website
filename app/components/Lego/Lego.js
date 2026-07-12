'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './Lego.scss'

export default function Lego({ content }) {
  const t = useTranslations('Lego')

  if (!content) {
    return (
      <div className="lego">
        <div className="lego__container">
          <p className="lego__no-content">{t('noContent')}</p>
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
    <div className="lego">
      <div className="lego__container">
        {/* Header Section */}
        <div className="lego__header">
          <h1 className="lego__title">{title}</h1>
          {subtitle && <p className="lego__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="lego__documents">
            <h2 className="lego__section-title">{t('documents')}</h2>
            <div className="lego__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="lego__document">
                  <div className="lego__document-content">
                    <div className="lego__document-header">
                      <span className="lego__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="lego__document-info">
                        <h3 className="lego__document-title">{doc.title}</h3>
                        <p className="lego__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="lego__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="lego__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="lego__button lego__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="lego__button lego__button--download"
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
          <div className="lego__gallery-section">
            <h2 className="lego__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="lego__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

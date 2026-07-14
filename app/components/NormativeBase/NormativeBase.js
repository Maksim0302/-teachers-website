'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './NormativeBase.scss'

export default function NormativeBase({ content }) {
  const t = useTranslations('NormativeBase')

  if (!content) {
    return (
      <div className="normative-base">
        <div className="normative-base__container">
          <p className="normative-base__no-content">{t('noContent')}</p>
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
    <div className="normative-base">
      <div className="normative-base__container">
        {/* Header Section */}
        <div className="normative-base__header">
          <h1 className="normative-base__title">{title}</h1>
          {subtitle && <p className="normative-base__subtitle">{subtitle}</p>}
        </div>

        {/* Documents Section */}
        {documents && documents.length > 0 && (
          <div className="normative-base__documents">
            <h2 className="normative-base__section-title">{t('documents')}</h2>
            <div className="normative-base__documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="normative-base__document">
                  <div className="normative-base__document-content">
                    <div className="normative-base__document-header">
                      <span className="normative-base__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="normative-base__document-info">
                        <h3 className="normative-base__document-title">
                          {doc.title}
                        </h3>
                        <p className="normative-base__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="normative-base__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="normative-base__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="normative-base__button normative-base__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="normative-base__button normative-base__button--download"
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
          <div className="normative-base__gallery-section">
            <h2 className="normative-base__section-title">{t('gallery')}</h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {/* Empty State */}
        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="normative-base__no-content">{t('noContent')}</p>
          )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './PresentationsForLessons.scss'

export default function PresentationsForLessons({ content }) {
  const t = useTranslations('PresentationsForLessons')

  if (!content) {
    return (
      <div className="presentations-for-lessons">
        <div className="presentations-for-lessons__container">
          <p className="presentations-for-lessons__no-content">
            {t('noContent')}
          </p>
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
    <div className="presentations-for-lessons">
      <div className="presentations-for-lessons__container">
        <div className="presentations-for-lessons__header">
          <h1 className="presentations-for-lessons__title">{title}</h1>
          {subtitle && (
            <p className="presentations-for-lessons__subtitle">{subtitle}</p>
          )}
        </div>

        {documents && documents.length > 0 && (
          <div className="presentations-for-lessons__documents">
            <h2 className="presentations-for-lessons__section-title">
              {t('documents')}
            </h2>
            <div className="presentations-for-lessons__documents-grid">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="presentations-for-lessons__document"
                >
                  <div className="presentations-for-lessons__document-content">
                    <div className="presentations-for-lessons__document-header">
                      <span className="presentations-for-lessons__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="presentations-for-lessons__document-info">
                        <h3 className="presentations-for-lessons__document-title">
                          {doc.title}
                        </h3>
                        <p className="presentations-for-lessons__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="presentations-for-lessons__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="presentations-for-lessons__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="presentations-for-lessons__button presentations-for-lessons__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="presentations-for-lessons__button presentations-for-lessons__button--download"
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
          <div className="presentations-for-lessons__gallery-section">
            <h2 className="presentations-for-lessons__section-title">
              {t('gallery')}
            </h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="presentations-for-lessons__no-content">
              {t('noContent')}
            </p>
          )}
      </div>
    </div>
  )
}

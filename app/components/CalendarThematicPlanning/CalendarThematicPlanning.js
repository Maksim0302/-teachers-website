'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PhotoGallery from './PhotoGallery'
import './CalendarThematicPlanning.scss'

export default function CalendarThematicPlanning({ content }) {
  const t = useTranslations('CalendarThematicPlanning')

  if (!content) {
    return (
      <div className="calendar-thematic-planning">
        <div className="calendar-thematic-planning__container">
          <p className="calendar-thematic-planning__no-content">
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
    <div className="calendar-thematic-planning">
      <div className="calendar-thematic-planning__container">
        <div className="calendar-thematic-planning__header">
          <h1 className="calendar-thematic-planning__title">{title}</h1>
          {subtitle && (
            <p className="calendar-thematic-planning__subtitle">{subtitle}</p>
          )}
        </div>

        {documents && documents.length > 0 && (
          <div className="calendar-thematic-planning__documents">
            <h2 className="calendar-thematic-planning__section-title">
              {t('documents')}
            </h2>
            <div className="calendar-thematic-planning__documents-grid">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="calendar-thematic-planning__document"
                >
                  <div className="calendar-thematic-planning__document-content">
                    <div className="calendar-thematic-planning__document-header">
                      <span className="calendar-thematic-planning__file-icon">
                        {getFileIcon(doc.fileType)}
                      </span>
                      <div className="calendar-thematic-planning__document-info">
                        <h3 className="calendar-thematic-planning__document-title">
                          {doc.title}
                        </h3>
                        <p className="calendar-thematic-planning__file-info">
                          {doc.fileName} • {getFileTypeLabel(doc.fileType)}
                        </p>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="calendar-thematic-planning__document-description">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="calendar-thematic-planning__document-buttons">
                    {doc.fileType === 'pdf' && (
                      <button
                        className="calendar-thematic-planning__button calendar-thematic-planning__button--preview"
                        onClick={() => handlePreview(doc.fileUrl)}
                        title={t('preview')}
                      >
                        {t('preview')}
                      </button>
                    )}
                    <button
                      className="calendar-thematic-planning__button calendar-thematic-planning__button--download"
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
          <div className="calendar-thematic-planning__gallery-section">
            <h2 className="calendar-thematic-planning__section-title">
              {t('gallery')}
            </h2>
            <PhotoGallery images={gallery} />
          </div>
        )}

        {(!documents || documents.length === 0) &&
          (!gallery || gallery.length === 0) && (
            <p className="calendar-thematic-planning__no-content">
              {t('noContent')}
            </p>
          )}
      </div>
    </div>
  )
}

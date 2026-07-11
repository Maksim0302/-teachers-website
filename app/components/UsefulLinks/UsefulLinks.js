'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import './UsefulLinks.scss'

const UsefulLinks = ({ content }) => {
  const t = useTranslations('UsefulLinks')

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''
  const documents = content?.documents || []

  // Debug logging
  if (!title) {
    console.warn('UsefulLinks: Missing title', {
      title,
      subtitle,
      documents: documents?.length || 0,
    })
  }

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') {
      return '📄'
    }
    return '📘'
  }

  const getFileTypeLabel = (fileType) => {
    if (fileType === 'pdf') return 'PDF'
    return 'Word'
  }

  const handlePreview = (fileUrl, fileExtension) => {
    // PDF preview support
    if (fileExtension === 'pdf') {
      window.open(fileUrl, '_blank')
      return
    }

    // For Word documents, suggest download
    handleDownload(fileUrl, '')
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
    <section className="useful-links">
      <div className="container">
        <div className="useful-links__header">
          <h1 className="useful-links__title">{title}</h1>
          {subtitle && <p className="useful-links__subtitle">{subtitle}</p>}
        </div>

        {documents && documents.length > 0 ? (
          <div className="useful-links__list">
            {documents.map((doc, index) => (
              <div key={doc.id || index} className="useful-links__document">
                <div className="useful-links__document-header">
                  <div className="useful-links__document-icon">
                    {getFileIcon(doc.fileType)}
                  </div>

                  <div className="useful-links__document-info">
                    <h3 className="useful-links__document-title">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="useful-links__document-description">
                        {doc.description}
                      </p>
                    )}
                    <div className="useful-links__document-meta">
                      <span className="useful-links__file-type">
                        {getFileTypeLabel(doc.fileType)}
                      </span>
                      <span className="useful-links__file-name">
                        {doc.fileName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="useful-links__buttons">
                  {doc.fileType === 'pdf' && (
                    <button
                      className="useful-links__button useful-links__button--preview"
                      onClick={() => handlePreview(doc.fileUrl, doc.fileType)}
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
        ) : (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            {t('noFiles')}
          </p>
        )}
      </div>
    </section>
  )
}

export default UsefulLinks

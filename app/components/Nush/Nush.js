'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import './Nush.scss'

const Nush = ({ content }) => {
  const t = useTranslations('Nush')

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''
  const documents = content?.documents || []

  // Debug logging
  if (!title) {
    console.warn('Nush: Missing title', {
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
    <section className="nush">
      <div className="container">
        <div className="nush__header">
          <h1 className="nush__title">{title}</h1>
          {subtitle && <p className="nush__subtitle">{subtitle}</p>}
        </div>

        {documents && documents.length > 0 ? (
          <div className="nush__list">
            {documents.map((doc, index) => (
              <div key={doc.id || index} className="nush__document">
                <div className="nush__document-header">
                  <div className="nush__document-icon">
                    {getFileIcon(doc.fileType)}
                  </div>

                  <div className="nush__document-info">
                    <h3 className="nush__document-title">{doc.title}</h3>
                    {doc.description && (
                      <p className="nush__document-description">
                        {doc.description}
                      </p>
                    )}
                    <div className="nush__document-meta">
                      <span className="nush__file-type">
                        {getFileTypeLabel(doc.fileType)}
                      </span>
                      <span className="nush__file-name">{doc.fileName}</span>
                    </div>
                  </div>
                </div>

                <div className="nush__buttons">
                  {doc.fileType === 'pdf' && (
                    <button
                      className="nush__button nush__button--preview"
                      onClick={() => handlePreview(doc.fileUrl, doc.fileType)}
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
        ) : (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            {t('noDocuments')}
          </p>
        )}
      </div>
    </section>
  )
}

export default Nush

'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import './NormativeBase.scss'

const NormativeBase = ({ content }) => {
  const t = useTranslations('NormativeBase')

  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''
  const documents = content?.documents || []

  // Debug logging
  if (!title) {
    console.warn('NormativeBase: Missing title', {
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
    <section className="normative-base">
      <div className="container">
        <div className="normative-base__header">
          <h1 className="normative-base__title">{title}</h1>
          {subtitle && <p className="normative-base__subtitle">{subtitle}</p>}
        </div>

        {documents && documents.length > 0 ? (
          <div className="normative-base__list">
            {documents.map((doc, index) => (
              <div key={doc.id || index} className="normative-base__document">
                <div className="normative-base__document-header">
                  <div className="normative-base__document-icon">
                    {getFileIcon(doc.fileType)}
                  </div>

                  <div className="normative-base__document-info">
                    <h3 className="normative-base__document-title">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="normative-base__document-description">
                        {doc.description}
                      </p>
                    )}
                    <div className="normative-base__document-meta">
                      <span className="normative-base__file-type">
                        {getFileTypeLabel(doc.fileType)}
                      </span>
                      <span className="normative-base__file-name">
                        {doc.fileName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="normative-base__document-actions">
                  {doc.fileType === 'pdf' && (
                    <button
                      className="normative-base__button normative-base__button--preview"
                      onClick={() =>
                        handlePreview(doc.fileUrl, doc.fileExtension)
                      }
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
        ) : (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            {t('noDocuments')}
          </p>
        )}
      </div>
    </section>
  )
}

export default NormativeBase

'use client'

import React from 'react'

const DocumentCard = ({ document, t }) => {
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
    <div className="bzhd__document">
      <div className="bzhd__document-header">
        <div className="bzhd__document-icon">
          {getFileIcon(document.fileType)}
        </div>

        <div className="bzhd__document-info">
          <h3 className="bzhd__document-title">{document.title}</h3>
          {document.description && (
            <p className="bzhd__document-description">
              {document.description}
            </p>
          )}
          <div className="bzhd__document-meta">
            <span className="bzhd__file-type">
              {getFileTypeLabel(document.fileType)}
            </span>
            <span className="bzhd__file-name">{document.fileName}</span>
          </div>
        </div>
      </div>

      <div className="bzhd__document-actions">
        {document.fileType === 'pdf' && (
          <button
            className="bzhd__button bzhd__button--preview"
            onClick={() =>
              handlePreview(document.fileUrl, document.fileExtension)
            }
            title={t('preview')}
          >
            {t('preview')}
          </button>
        )}

        <button
          className="bzhd__button bzhd__button--download"
          onClick={() => handleDownload(document.fileUrl, document.fileName)}
          title={t('download')}
        >
          {t('download')}
        </button>
      </div>
    </div>
  )
}

export default DocumentCard

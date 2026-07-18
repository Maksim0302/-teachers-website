'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import '@/app/components/VideoGallery/VideoGallery.scss'

const VideoGalleryPageContent = ({ content }) => {
  const t = useTranslations('VideoGallery')

  if (!content || !content.videos || content.videos.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p>{t('noVideos', 'No videos available')}</p>
      </div>
    )
  }

  const { title, subtitle, videos } = content

  return (
    <section className="video-gallery">
      <div className="container video-gallery__container">
        {/* Title and Subtitle */}
        <div>
          <h1 className="video-gallery__title">{title}</h1>
          {subtitle && <p className="video-gallery__subtitle">{subtitle}</p>}
        </div>

        {/* Videos Grid */}
        <div className="video-gallery__grid">
          {videos.map((video) => (
            <div key={video.id} className="video-gallery__card">
              <div className="video-gallery__video-wrapper">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                  title={video.title}
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-gallery__iframe"
                ></iframe>
              </div>
              <div className="video-gallery__card-content">
                <h3 className="video-gallery__card-title">{video.title}</h3>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-gallery__card-link"
                  title={t('watchOnYoutube')}
                >
                  {t('watchOnYoutube')} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoGalleryPageContent

'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import './VideoGallery.scss'

const VideoGallery = ({ content }) => {
  const t = useTranslations('VideoGallery')
  const locale = useLocale()
  const [activeVideoId, setActiveVideoId] = useState(null)
  const iframeRefs = useRef({})

  // Use content passed from server
  const allVideos = content?.videos || []
  const videos = allVideos.slice(0, 3) // Show only first 3 videos on home page
  const title = content?.title || t('title')
  const subtitle = content?.subtitle || ''

  const handleVideoClick = (videoId) => {
    // Pause all other videos by reloading their sources
    Object.keys(iframeRefs.current).forEach((key) => {
      if (key !== videoId && iframeRefs.current[key]) {
        // Reset iframe src to pause playback
        const currentSrc = iframeRefs.current[key].src
        iframeRefs.current[key].src = currentSrc.replace('?autoplay=1', '?')
      }
    })

    // Set active video
    if (activeVideoId !== videoId) {
      setActiveVideoId(videoId)
    }
  }

  return (
    <section className="video-gallery" id="video-gallery">
      <div className="container video-gallery__container">
        {/* Title */}
        <div>
          <h2 className="video-gallery__title">{title}</h2>
          {subtitle && <p className="video-gallery__subtitle">{subtitle}</p>}
        </div>

        {/* Videos Grid */}
        {videos && videos.length > 0 ? (
          <div className="video-gallery__grid">
            {videos.map((video) => (
              <div
                key={video.id}
                className="video-gallery__card"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="video-gallery__video-wrapper">
                  <iframe
                    ref={(el) => {
                      if (el) iframeRefs.current[video.id] = el
                    }}
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
        ) : (
          <div className="video-gallery__empty">
            <p className="video-gallery__empty-text">{t('noVideos')}</p>
          </div>
        )}

        {/* Button to view all */}
        <div className="video-gallery__button-wrapper">
          <Link
            href={`/${locale}/video-gallery`}
            className="video-gallery__button"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VideoGallery

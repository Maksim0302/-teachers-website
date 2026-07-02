'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import './VideoGallery.scss'

const VideoGallery = () => {
  const t = useTranslations('VideoGallery')
  const locale = useLocale()
  const [activeVideoId, setActiveVideoId] = useState(null)
  const iframeRefs = useRef({})

  // Sample video data - you can replace with actual data from Sanity
  const videos = [
    {
      id: 1,
      videoId: 'mdkHvQk757k',
      title: 'Video 1',
    },
    {
      id: 2,
      videoId: 'V0XB8t2Z6_4',
      title: 'Video 2',
    },
    {
      id: 3,
      videoId: 't7bkuP7K_1s',
      title: 'Video 3',
    },
  ]

  const handleVideoClick = (videoId) => {
    // Pause all other videos
    Object.keys(iframeRefs.current).forEach((key) => {
      if (parseInt(key) !== videoId && iframeRefs.current[key]) {
        iframeRefs.current[key].style.pointerEvents = 'none'
        iframeRefs.current[key].src = iframeRefs.current[key].src
          .replace('?autoplay=1', '')
          .replace('&autoplay=1', '')
      }
    })

    // Set active video
    if (activeVideoId !== videoId) {
      setActiveVideoId(videoId)
    }
  }

  return (
    <section className="video-gallery">
      <div className="container video-gallery__container">
        {/* Title */}
        <h2 className="video-gallery__title">{t('title')}</h2>

        {/* Videos Grid */}
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
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-gallery__iframe"
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
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

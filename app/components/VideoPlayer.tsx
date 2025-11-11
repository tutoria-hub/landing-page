'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VideoPlayerProps {
  videoId: string
  thumbnailSrc?: string
  title?: string
}

export default function VideoPlayer({
  videoId,
  thumbnailSrc = '/video-thumbnail.jpg',
  title = 'Tutoria Demo'
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full max-w-[896px] mx-auto aspect-video rounded-xl overflow-hidden bg-white border-2 border-[#DCDCDC] shadow-[0_4px_12px_rgba(31,31,31,0.08)]">
      {!isPlaying ? (
        // Facade: Custom thumbnail with play button
        <button
          onClick={handlePlay}
          className="relative w-full h-full group cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail Image */}
          <div className="absolute inset-0 bg-[#F7F5ED]">
            {thumbnailSrc && (
              <Image
                src={thumbnailSrc}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#30A46C] flex items-center justify-center transition-all duration-200 group-hover:opacity-90 group-hover:scale-105">
              {/* Play Icon */}
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        // YouTube iframe (loads only after click)
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full animate-in fade-in duration-300"
        />
      )}
    </div>
  )
}

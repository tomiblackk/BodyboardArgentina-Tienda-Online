"use client"

import type React from "react"
import { useState } from "react"

interface VideoHeroProps {
  children: React.ReactNode
  videoSrc: string
  posterImage?: string
  height?: string
}

export function VideoHero({ children, videoSrc, posterImage, height = "100vh" }: VideoHeroProps) {
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative overflow-hidden" style={{ height }}>
      {/* Video Background */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterImage}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        /* Fallback to image if video fails */
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${posterImage || "/images/backgrounds/hero-perfect-wave.jpeg"})`,
          }}
        />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">{children}</div>

      {/* Video loading indicator */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs">{videoError ? "📷 Imagen" : "🎬 Video"}</div>
    </section>
  )
}

"use client"

import type React from "react"
import Image from "next/image"
import { useParallax } from "@/hooks/use-parallax"

interface ParallaxHeroProps {
  children: React.ReactNode
  backgroundImage: string
  height?: string
}

export function ParallaxHero({ children, backgroundImage, height = "600px" }: ParallaxHeroProps) {
  const parallaxOffset = useParallax(0.5)

  return (
    <section className="relative overflow-hidden" style={{ height }}>
      {/* Background with parallax effect */}
      <div className="absolute inset-0 w-full h-[120%]" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      >
        <source src="/videos/bodyboard-wave.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
        {children}
      </div>
    </section>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "default" | "outline" | "ghost"
  className?: string
  showLabel?: boolean
}

export function BackButton({
  href,
  label = "Volver",
  variant = "outline",
  className = "",
  showLabel = false,
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant={variant}
      size={showLabel ? "sm" : "icon"}
      onClick={handleBack}
      className={`${showLabel ? "flex items-center gap-1" : ""} ${className}`}
    >
      <ChevronLeft className="h-4 w-4" />
      {showLabel && <span>{label}</span>}
      <span className="sr-only">{label}</span>
    </Button>
  )
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  createdAt: string
}

interface ProfileContextValue {
  profile: UserProfile | null
  isLoading: boolean
  login: (email: string) => Promise<UserProfile | null>
  register: (data: Omit<UserProfile, "id" | "createdAt">) => Promise<UserProfile>
  logout: () => void
}

const COOKIE_NAME = "bb_profile_email"

function setSessionCookie(email: string) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(email)};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`
}

function getSessionCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function clearSessionCookie() {
  document.cookie = `${COOKIE_NAME}=;path=/;max-age=0`
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount, check for an existing session cookie and restore the profile
  useEffect(() => {
    const savedEmail = getSessionCookie()
    if (!savedEmail) {
      setIsLoading(false)
      return
    }

    fetch(`/api/profile?email=${encodeURIComponent(savedEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile)
        } else {
          clearSessionCookie()
        }
      })
      .catch(() => {
        clearSessionCookie()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = useCallback(async (email: string): Promise<UserProfile | null> => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.profile) {
        setProfile(data.profile)
        setSessionCookie(data.profile.email)
        return data.profile
      }
      return null
    } catch {
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(
    async (data: Omit<UserProfile, "id" | "createdAt">): Promise<UserProfile> => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || "Error al crear el perfil")
        }

        const { profile: newProfile } = await res.json()
        setProfile(newProfile)
        setSessionCookie(newProfile.email)
        return newProfile
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const logout = useCallback(() => {
    setProfile(null)
    clearSessionCookie()
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, isLoading, login, register, logout }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}

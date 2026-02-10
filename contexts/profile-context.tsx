"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

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

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string): Promise<UserProfile | null> => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.profile) {
        setProfile(data.profile)
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
        return newProfile
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const logout = useCallback(() => {
    setProfile(null)
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

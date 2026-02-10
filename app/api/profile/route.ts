import { put, list } from "@vercel/blob"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  createdAt: string
}

const PROFILES_BLOB_PATH = "profiles/profiles.json"

async function getProfiles(): Promise<UserProfile[]> {
  try {
    const { blobs } = await list({ prefix: PROFILES_BLOB_PATH })
    if (blobs.length === 0) {
      return []
    }
    const response = await fetch(blobs[0].url, { cache: "no-store" })
    if (!response.ok) {
      return []
    }
    return await response.json()
  } catch {
    return []
  }
}

async function saveProfiles(profiles: UserProfile[]): Promise<void> {
  await put(PROFILES_BLOB_PATH, JSON.stringify(profiles), {
    access: "public",
    addRandomSuffix: false,
  })
}

// GET - retrieve a profile by email (query param)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const profiles = await getProfiles()
    const profile = profiles.find(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    )

    if (!profile) {
      return NextResponse.json({ profile: null })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

// POST - create a new profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, city } = body

    if (!firstName || !lastName || !email || !phone || !city) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El email no es valido" },
        { status: 400 }
      )
    }

    const profiles = await getProfiles()

    const existing = profiles.find(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    )
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un perfil con este email" },
        { status: 409 }
      )
    }

    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      createdAt: new Date().toISOString(),
    }

    profiles.push(newProfile)
    await saveProfiles(profiles)

    return NextResponse.json({ profile: newProfile }, { status: 201 })
  } catch (error) {
    console.error("Error creating profile:", error)
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    )
  }
}

import { put, list, head } from "@vercel/blob"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export interface MarketplaceProduct {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  location: string
  images: string[]
  seller: {
    id: number
    name: string
    avatar: string
    rating: number
    verified: boolean
    memberSince: string
    responseRate: string
    responseTime: string
    phone?: string
    email?: string
    city?: string
  }
  postedAt: string
  createdAt: string
}

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  createdAt: string
}

const PRODUCTS_BLOB_PATH = "marketplace/products.json"
const PROFILES_BLOB_PATH = "profiles/profiles.json"

async function getProfiles(): Promise<UserProfile[]> {
  try {
    const { blobs } = await list({ prefix: PROFILES_BLOB_PATH })
    if (blobs.length === 0) return []
    const response = await fetch(blobs[0].url, { cache: "no-store" })
    if (!response.ok) return []
    return await response.json()
  } catch {
    return []
  }
}

async function getProducts(): Promise<MarketplaceProduct[]> {
  try {
    // List blobs to find the products.json file
    const { blobs } = await list({ prefix: PRODUCTS_BLOB_PATH })
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

async function saveProducts(products: MarketplaceProduct[]): Promise<void> {
  await put(PRODUCTS_BLOB_PATH, JSON.stringify(products), {
    access: "public",
    addRandomSuffix: false,
  })
}

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ products: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, description, price, category, condition, location, images, sellerProfileId } = body

    if (!title || !description || !price || !category || !condition || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const products = await getProducts()

    const conditionLabels: Record<string, string> = {
      "como-nuevo": "Como nuevo",
      "casi-nuevo": "Casi nuevo",
      "buen-estado": "Buen estado",
      "usado": "Usado",
    }

    const categoryLabels: Record<string, string> = {
      "tablas": "Tablas",
      "patas": "Patas de Rana",
      "trajes": "Trajes",
      "accesorios": "Accesorios",
    }

    const locationLabels: Record<string, string> = {
      "mar-del-plata": "Mar del Plata, Buenos Aires",
      "pinamar": "Pinamar, Buenos Aires",
      "villa-gesell": "Villa Gesell, Buenos Aires",
      "miramar": "Miramar, Buenos Aires",
      "mar-de-ajo": "Mar de Ajo, Buenos Aires",
      "otra": "Otra ubicacion",
    }

    // Look up seller profile if provided
    let sellerInfo = {
      id: 200,
      name: "Usuario",
      avatar: "",
      rating: 5.0,
      verified: false,
      memberSince: new Date().getFullYear().toString(),
      responseRate: "N/A",
      responseTime: "N/A",
      phone: "",
      email: "",
      city: "",
    }

    if (sellerProfileId) {
      const profiles = await getProfiles()
      const sellerProfile = profiles.find((p) => p.id === sellerProfileId)
      if (sellerProfile) {
        sellerInfo = {
          id: Number(sellerProfile.id.replace("profile-", "")) || 200,
          name: `${sellerProfile.firstName} ${sellerProfile.lastName}`,
          avatar: "",
          rating: 5.0,
          verified: true,
          memberSince: new Date(sellerProfile.createdAt).getFullYear().toString(),
          responseRate: "N/A",
          responseTime: "N/A",
          phone: sellerProfile.phone,
          email: sellerProfile.email,
          city: sellerProfile.city,
        }
      }
    }

    const newProduct: MarketplaceProduct = {
      id: `user-${Date.now()}`,
      title,
      description,
      price: Number(price),
      category: categoryLabels[category] || category,
      condition: conditionLabels[condition] || condition,
      location: locationLabels[location] || location,
      images: images || [],
      seller: sellerInfo,
      postedAt: "Recien publicado",
      createdAt: new Date().toISOString(),
    }

    products.unshift(newProduct)
    await saveProducts(products)

    return NextResponse.json({ product: newProduct })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

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
  }
  postedAt: string
  createdAt: string
}

const PRODUCTS_BLOB_PATH = "marketplace/products.json"

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

    const { title, description, price, category, condition, location, images } = body

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

    const newProduct: MarketplaceProduct = {
      id: `user-${Date.now()}`,
      title,
      description,
      price: Number(price),
      category: categoryLabels[category] || category,
      condition: conditionLabels[condition] || condition,
      location: locationLabels[location] || location,
      images: images || [],
      seller: {
        id: 200,
        name: "Usuario",
        avatar: "",
        rating: 5.0,
        verified: false,
        memberSince: new Date().getFullYear().toString(),
        responseRate: "N/A",
        responseTime: "N/A",
      },
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

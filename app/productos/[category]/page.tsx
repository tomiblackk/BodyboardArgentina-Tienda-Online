"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// Categorías disponibles
const validCategories = ["tablas", "patas-de-rana", "trajes", "accesorios"]

// Datos de ejemplo para cada categoría
const categoryData = {
  tablas: {
    title: "Tablas de Bodyboard",
    description:
      "Descubre nuestra selección de tablas de bodyboard para todos los niveles, desde principiantes hasta profesionales.",
    heroImage: "/images/categories/tablas-profesionales.jpeg",
    products: [
      {
        id: 101,
        name: "Tabla Pride The Answer PP",
        price: 89999,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 10,
        isNew: true,
        category: "Tablas",
      },
      {
        id: 102,
        name: "Tabla Science Style Loaded PP",
        price: 95000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Tablas",
      },
      {
        id: 103,
        name: "Tabla NMD Element",
        price: 110000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 5,
        isNew: true,
        category: "Tablas",
      },
      {
        id: 104,
        name: "Tabla VS Ignition PE",
        price: 75000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Tablas",
      },
      {
        id: 105,
        name: "Tabla Manta Phantom",
        price: 88000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: true,
        category: "Tablas",
      },
      {
        id: 106,
        name: "Tabla Pride Royal Flush",
        price: 120000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 15,
        isNew: false,
        category: "Tablas",
      },
    ],
  },
  "patas-de-rana": {
    title: "Patas de Rana",
    description: "Las mejores aletas para bodyboard que te darán potencia y control en el agua.",
    heroImage: "/images/categories/patas-profesionales.jpeg",
    products: [
      {
        id: 201,
        name: "Patas de Rana Viper Delta 2",
        price: 45999,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Patas de Rana",
      },
      {
        id: 202,
        name: "Patas de Rana Churchill Makapuu",
        price: 38000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 10,
        isNew: true,
        category: "Patas de Rana",
      },
      {
        id: 203,
        name: "Patas de Rana Hydro Tech 2",
        price: 42000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Patas de Rana",
      },
      {
        id: 204,
        name: "Patas de Rana MS Viper",
        price: 36000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 5,
        isNew: true,
        category: "Patas de Rana",
      },
    ],
  },
  trajes: {
    title: "Trajes de Neoprene",
    description: "Trajes de neoprene de alta calidad para mantener el calor en aguas frías.",
    heroImage: "/images/categories/traje-profesional.jpeg",
    products: [
      {
        id: 301,
        name: "Traje Neoprene Rip Curl 3/2mm",
        price: 120000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 15,
        isNew: true,
        category: "Trajes",
      },
      {
        id: 302,
        name: "Traje Neoprene Billabong 4/3mm",
        price: 135000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Trajes",
      },
      {
        id: 303,
        name: "Traje Neoprene O'Neill 3/2mm",
        price: 128000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 10,
        isNew: true,
        category: "Trajes",
      },
      {
        id: 304,
        name: "Chaleco Neoprene Quiksilver 2mm",
        price: 65000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Trajes",
      },
      {
        id: 305,
        name: "Capucha Neoprene 3mm",
        price: 25000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: true,
        category: "Trajes",
      },
    ],
  },
  accesorios: {
    title: "Accesorios para Bodyboard",
    description: "Complementa tu equipo con nuestros accesorios especializados para bodyboard.",
    heroImage: "/images/categories/accesorios-profesionales.jpeg",
    products: [
      {
        id: 401,
        name: "Leash Bodyboard Pro",
        price: 12999,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Accesorios",
      },
      {
        id: 402,
        name: "Funda Bodyboard Acolchada",
        price: 18000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 5,
        isNew: true,
        category: "Accesorios",
      },
      {
        id: 403,
        name: "Parafina Sex Wax",
        price: 3500,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: false,
        category: "Accesorios",
      },
      {
        id: 404,
        name: "Grip Bodyboard Antideslizante",
        price: 8500,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: true,
        category: "Accesorios",
      },
      {
        id: 405,
        name: "Calcetines Neoprene 3mm",
        price: 15000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 10,
        isNew: false,
        category: "Accesorios",
      },
      {
        id: 406,
        name: "Guantes Neoprene 2mm",
        price: 14000,
        image: "/images/products/bodyboard-kit-complete.jpeg",
        discount: 0,
        isNew: true,
        category: "Accesorios",
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Verificar si la categoría existe
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Obtener datos de la categoría
  const categoryInfo = categoryData[category as keyof typeof categoryData]

  const handleAddToCart = (product: (typeof categoryInfo.products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image,
      category: product.category,
    })

    toast({
      title: "Producto agregado al carrito",
      description: `${product.name} ha sido agregado a tu carrito.`,
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <BackButton href="/" />
        <h1 className="text-3xl font-bold">{categoryInfo.title}</h1>
      </div>

      {/* Hero Image para la categoría */}
      {categoryInfo.heroImage && (
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <Image
            src={categoryInfo.heroImage || "/placeholder.svg"}
            alt={categoryInfo.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2">{categoryInfo.title}</h2>
              <p className="text-lg max-w-2xl">{categoryInfo.description}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-muted-foreground mb-8">{categoryInfo.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryInfo.products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <Link href={`/producto/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {product.discount > 0 && <Badge className="bg-red-500">-{product.discount}%</Badge>}
                {product.isNew && <Badge className="bg-cyan-600">Nuevo</Badge>}
              </div>
            </div>
            <CardContent className="p-4">
              <Link href={`/producto/${product.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2">
                {product.discount > 0 ? (
                  <>
                    <span className="font-bold text-lg">
                      ${Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground line-through text-sm">
                      ${product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

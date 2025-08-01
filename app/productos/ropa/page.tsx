"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function RopaPage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const ropaProducts = [
    {
      id: 501,
      name: "Remera Bodyboard Argentina - Negra",
      price: 15000,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 0,
      isNew: true,
      category: "Ropa",
    },
    {
      id: 502,
      name: "Remera Bodyboard Argentina - Blanca",
      price: 15000,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 10,
      isNew: false,
      category: "Ropa",
    },
    {
      id: 503,
      name: "Hoodie Bodyboard Argentina",
      price: 28000,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 0,
      isNew: true,
      category: "Ropa",
    },
    {
      id: 504,
      name: "Gorra Bodyboard Argentina",
      price: 12000,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 15,
      isNew: false,
      category: "Ropa",
    },
    {
      id: 505,
      name: "Taza Bodyboard Argentina",
      price: 8000,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 0,
      isNew: true,
      category: "Merchandising",
    },
    {
      id: 506,
      name: "Llavero Bodyboard Argentina",
      price: 3500,
      image: "/images/products/bodyboard-kit-complete.jpeg",
      discount: 0,
      isNew: false,
      category: "Merchandising",
    },
  ]

  const handleAddToCart = (product: (typeof ropaProducts)[0]) => {
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
        <h1 className="text-3xl font-bold">Ropa & Merchandising</h1>
      </div>

      {/* Hero Image para la categoría */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
        <Image
          src="/images/categories/accesorios-profesionales.jpeg"
          alt="Ropa y Merchandising Bodyboard Argentina"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">Ropa & Merchandising</h2>
            <p className="text-lg max-w-2xl">
              Lleva el estilo Bodyboard Argentina contigo. Ropa cómoda y merchandising oficial para verdaderos riders.
            </p>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-8">
        Descubre nuestra colección de ropa y merchandising oficial. Desde remeras y hoodies hasta accesorios únicos,
        todo diseñado para los amantes del bodyboard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ropaProducts.map((product) => (
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
              <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
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

"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: 1,
    name: "Tabla Pride The Answer PP",
    category: "Tablas",
    price: 89999,
    image: "/images/products/bodyboard-kit-complete.jpeg",
    discount: 10,
    isNew: true,
  },
  {
    id: 2,
    name: "Patas de Rana Viper Delta 2",
    category: "Patas de Rana",
    price: 45999,
    image: "/images/products/bodyboard-kit-complete.jpeg",
    discount: 0,
    isNew: false,
  },
  {
    id: 3,
    name: "Traje Neoprene Rip Curl 3/2mm",
    category: "Trajes",
    price: 120000,
    image: "/images/products/bodyboard-kit-complete.jpeg",
    discount: 15,
    isNew: true,
  },
  {
    id: 4,
    name: "Leash Bodyboard Pro",
    category: "Accesorios",
    price: 12999,
    image: "/images/products/bodyboard-kit-complete.jpeg",
    discount: 0,
    isNew: false,
  },
]

export default function FeaturedProducts() {
  const { toast } = useToast()
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof products)[0]) => {
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
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/productos/tablas">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

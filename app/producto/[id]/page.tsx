"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

// Datos de ejemplo para productos
const products = [
  {
    id: "101",
    name: "Tabla Pride The Answer PP",
    category: "Tablas",
    price: 89999,
    discount: 10,
    isNew: true,
    description:
      "La tabla Pride The Answer PP es perfecta para riders intermedios y avanzados. Ofrece un excelente control y respuesta en olas de tamaño mediano a grande. Su núcleo de polipropileno (PP) proporciona la combinación perfecta de flexibilidad y durabilidad.",
    features: [
      "Núcleo: Polipropileno (PP)",
      "Stringer: Doble stringer de fibra de carbono",
      "Tail: Crescent tail",
      "Canales: Canales profundos para mayor control",
      "Slick: HDPE de alta velocidad",
      'Medidas disponibles: 40", 41", 42"',
    ],
    specifications: {
      Material: "Polipropileno (PP)",
      Nivel: "Intermedio/Avanzado",
      "Peso máximo del rider": "85kg",
      "Tipo de olas": "Medianas a grandes",
      Origen: "Importado",
    },
    images: [
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
    ],
    stock: 5,
    rating: 4.8,
    reviews: 24,
    relatedProducts: [102, 103, 105],
  },
  {
    id: "201",
    name: "Patas de Rana Viper Delta 2",
    category: "Patas de Rana",
    price: 45999,
    discount: 0,
    isNew: false,
    description:
      "Las Viper Delta 2 son aletas de alto rendimiento diseñadas específicamente para bodyboard. Ofrecen una excelente propulsión y control en el agua, permitiéndote alcanzar mayor velocidad con menos esfuerzo.",
    features: [
      "Material: Goma natural de alta calidad",
      "Diseño asimétrico para mayor control",
      "Canales de flujo de agua para mejor propulsión",
      "Talón cerrado para mayor comodidad",
      "Flotabilidad positiva",
    ],
    specifications: {
      Material: "Goma natural",
      Nivel: "Todos los niveles",
      Flotabilidad: "Positiva",
      Origen: "Importado",
    },
    images: [
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
    ],
    stock: 8,
    rating: 4.6,
    reviews: 18,
    relatedProducts: [202, 203, 204],
  },
  {
    id: "301",
    name: "Traje Neoprene Rip Curl 3/2mm",
    category: "Trajes",
    price: 120000,
    discount: 15,
    isNew: true,
    description:
      "El traje de neoprene Rip Curl 3/2mm es perfecto para aguas templadas a frías. Ofrece excelente flexibilidad y retención de calor, manteniéndote cómodo durante largas sesiones en el agua.",
    features: [
      "Grosor: 3/2mm (torso 3mm, extremidades 2mm)",
      "Costuras: GBS (Glued & Blind Stitched)",
      "Cierre: Cremallera trasera YKK",
      "Sellado: Cuello ajustado para evitar entrada de agua",
      "Material: E5 Neoprene, más ligero y flexible",
    ],
    specifications: {
      Material: "E5 Neoprene",
      Grosor: "3/2mm",
      "Temperatura del agua": "14-19°C",
      Tipo: "Steamer (cuerpo completo)",
      Origen: "Importado",
    },
    images: [
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
      "/images/products/bodyboard-kit-complete.jpeg",
    ],
    stock: 3,
    rating: 4.9,
    reviews: 32,
    relatedProducts: [302, 303, 304],
  },
  {
    id: "105",
    name: "Tabla Manta Phantom",
    category: "Tablas",
    price: 88000,
    discount: 0,
    isNew: true,
    description:
      "La tabla Manta Phantom ofrece gran maniobrabilidad y flotabilidad, ideal para riders que buscan progresar rápidamente.",
    features: [
      "Núcleo: EPS de alta densidad",
      "Stringer: Single stringer de fibra de vidrio",
      "Tail: Crescent tail",
      "Canales: Canales dobles para mayor agarre",
      "Slick: HDPE slick de alta velocidad",
      'Medidas disponibles: 41", 42"',
    ],
    specifications: {
      Material: "EPS",
      Nivel: "Principiante / Intermedio",
      "Peso máximo del rider": "90 kg",
      "Tipo de olas": "Pequeñas a medianas",
      Origen: "Importado",
    },
    images: ["/images/products/bodyboard-kit-complete.jpeg"],
    stock: 7,
    rating: 4.4,
    reviews: 11,
    relatedProducts: [101, 103, 106],
  },
  {
    id: "106",
    name: "Tabla Pride Royal Flush",
    category: "Tablas",
    price: 120000,
    discount: 15,
    isNew: false,
    description:
      "La tabla Pride Royal Flush combina velocidad y control gracias a su núcleo PP con doble stringer. Ideal para riders que buscan alto rendimiento en olas potentes.",
    features: [
      "Núcleo: Polipropileno (PP) de alta densidad",
      "Stringer: Doble stringer de fibra de carbono",
      "Tail: Crescent tail",
      "Canales: Deep Quad Channels para máximo agarre",
      "Slick: Surlyn® de alta velocidad",
      'Medidas disponibles: 41", 42"',
    ],
    specifications: {
      Material: "PP + Surlyn",
      Nivel: "Avanzado / Pro",
      "Peso máximo del rider": "95 kg",
      "Tipo de olas": "Medianas a grandes",
      Origen: "Importado",
    },
    images: ["/images/products/bodyboard-kit-complete.jpeg"],
    stock: 4,
    rating: 4.7,
    reviews: 19,
    relatedProducts: [101, 103, 105],
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  // Si el producto no existe, mostrar 404
  if (!product) {
    notFound()
  }

  const { toast } = useToast()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: Number.parseInt(product.id),
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.images[0],
        category: product.category,
      })
    }

    toast({
      title: "Producto agregado al carrito",
      description: `${quantity} x ${product.name} agregado a tu carrito.`,
    })
  }

  const finalPrice = product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Volver al inicio</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/productos/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Imágenes del producto */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {product.discount > 0 && <Badge className="bg-red-500">-{product.discount}%</Badge>}
              {product.isNew && <Badge className="bg-cyan-600">Nuevo</Badge>}
            </div>
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-cyan-600" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            {product.discount > 0 ? (
              <>
                <span className="text-3xl font-bold">${finalPrice.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                <Badge className="bg-red-500 ml-2">-{product.discount}%</Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Disponibilidad:</span>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  En stock ({product.stock} disponibles)
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Agotado
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Categoría:</span>
              <Link href={`/productos/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge variant="secondary">{product.category}</Badge>
              </Link>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-center">
              <span className="font-medium mr-4">Cantidad:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al carrito
              </Button>
              <Button size="lg" variant="secondary" className="flex-1">
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información adicional */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="p-4 border rounded-md mt-2">
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating} de 5</span>
            <span className="text-muted-foreground">Basado en {product.reviews} reseñas</span>
          </div>
          <p className="text-muted-foreground">Las reseñas de los clientes se cargarán aquí.</p>
        </TabsContent>
      </Tabs>

      {/* Productos relacionados */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedId) => {
            const relatedProduct = products.find((p) => Number.parseInt(p.id) === relatedId)
            if (!relatedProduct) return null

            return (
              <Card key={relatedId} className="overflow-hidden">
                <div className="relative">
                  <Link href={`/producto/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {relatedProduct.discount > 0 && <Badge className="bg-red-500">-{relatedProduct.discount}%</Badge>}
                    {relatedProduct.isNew && <Badge className="bg-cyan-600">Nuevo</Badge>}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{relatedProduct.category}</div>
                  <Link href={`/producto/${relatedProduct.id}`} className="hover:underline">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    {relatedProduct.discount > 0 ? (
                      <>
                        <span className="font-bold text-lg">
                          ${Math.round(relatedProduct.price * (1 - relatedProduct.discount / 100)).toLocaleString()}
                        </span>
                        <span className="text-muted-foreground line-through text-sm">
                          ${relatedProduct.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-lg">${relatedProduct.price.toLocaleString()}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

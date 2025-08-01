"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Flag, MessageCircle, Share, Shield, Star, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerificationBadge } from "@/components/verification-badge"
import { ChatDialog } from "@/components/chat-dialog"

// Datos de ejemplo para el marketplace (mismo que en la página principal)
const marketplaceItems = [
  {
    id: 1,
    title: "Tabla Pride The Answer PP - Poco uso",
    description:
      "Vendo mi tabla Pride The Answer con muy poco uso, en excelente estado. La vendo porque me compré otra. Tiene algunos detalles menores de uso pero nada que afecte su rendimiento. Incluye quillas originales. La tabla tiene aproximadamente 6 meses de uso, siempre se guardó en su funda y se enjuagó con agua dulce después de cada uso. Ideal para riders intermedios y avanzados.",
    price: 65000,
    condition: "Casi nuevo",
    location: "Mar del Plata, Buenos Aires",
    images: [
      "/images/marketplace/pride-answer-pp-radial-flex-sdc-varial.jpg",
      "/images/marketplace/tabla-usada-1-2.png",
    ],
    seller: {
      id: 101,
      name: "Martín Rodríguez",
      avatar: "/images/users/user1.png",
      rating: 4.8,
      verified: true,
      memberSince: "2020",
      responseRate: "98%",
      responseTime: "Menos de 1 hora",
    },
    postedAt: "Hace 2 días",
    category: "Tablas",
    details: {
      brand: "Pride",
      model: "The Answer PP",
      size: '42"',
      purchaseYear: "2023",
      extras: "Incluye quillas originales",
    },
  },
  {
    id: 2,
    title: "Patas de rana Churchill - Talle 42",
    description:
      "Vendo patas de rana Churchill en buen estado. Talle 42. Las usé durante una temporada. Tienen algunos signos de desgaste normal pero están en buen estado general y funcionan perfectamente. Son muy cómodas y ofrecen excelente propulsión en el agua.",
    price: 28000,
    condition: "Buen estado",
    location: "Pinamar, Buenos Aires",
    images: ["/images/marketplace/churchill-fins-blue-yellow-talle-42.jpg"],
    seller: {
      id: 102,
      name: "Laura Gómez",
      avatar: "/images/users/user2.png",
      rating: 4.5,
      verified: true,
      memberSince: "2021",
      responseRate: "95%",
      responseTime: "Menos de 3 horas",
    },
    postedAt: "Hace 5 días",
    category: "Patas de Rana",
    details: {
      brand: "Churchill",
      model: "Makapuu",
      size: "42",
      purchaseYear: "2022",
      extras: "Incluye bolsa de transporte",
    },
  },
  {
    id: 3,
    title: "Traje de neoprene Rip Curl 3/2mm",
    description:
      "Vendo traje de neoprene Rip Curl 3/2mm en buen estado. Talle M. Tiene algunos parches pero está en buen estado general. Mantiene bien el calor y es muy flexible. Ideal para aguas templadas a frías.",
    price: 75000,
    condition: "Usado",
    location: "Villa Gesell, Buenos Aires",
    images: ["/images/marketplace/traje-usado-1.png", "/images/marketplace/traje-usado-1-2.png"],
    seller: {
      id: 103,
      name: "Pablo Martínez",
      avatar: "/images/users/user3.png",
      rating: 4.2,
      verified: false,
      memberSince: "2022",
      responseRate: "85%",
      responseTime: "Menos de 1 día",
    },
    postedAt: "Hace 1 semana",
    category: "Trajes",
    details: {
      brand: "Rip Curl",
      model: "E-Bomb 3/2mm",
      size: "M",
      purchaseYear: "2021",
      extras: "Incluye kit de reparación",
    },
  },
  {
    id: 4,
    title: "Leash Bodyboard Pro - Como nuevo",
    description:
      "Vendo leash Bodyboard Pro prácticamente sin uso. Lo compré pero casi no lo usé. Está en perfecto estado, como nuevo. Es ajustable y muy resistente.",
    price: 8500,
    condition: "Como nuevo",
    location: "Mar del Plata, Buenos Aires",
    images: ["/images/marketplace/leash-usado-1.png"],
    seller: {
      id: 104,
      name: "Carolina Silva",
      avatar: "/images/users/user4.png",
      rating: 5.0,
      verified: true,
      memberSince: "2019",
      responseRate: "100%",
      responseTime: "Menos de 30 minutos",
    },
    postedAt: "Hace 3 días",
    category: "Accesorios",
    details: {
      brand: "Bodyboard Pro",
      model: "Premium",
      purchaseYear: "2023",
      extras: "Incluye packaging original",
    },
  },
  {
    id: 5,
    title: "Tabla Science Style - Excelente estado",
    description:
      "Vendo tabla Science Style en excelente estado. La usé muy poco, está casi nueva. No tiene golpes ni reparaciones. Excelente para riders intermedios que quieran mejorar su técnica.",
    price: 72000,
    condition: "Casi nuevo",
    location: "Miramar, Buenos Aires",
    images: ["/images/marketplace/tabla-usada-2.png"],
    seller: {
      id: 105,
      name: "Diego Fernández",
      avatar: "/images/users/user5.png",
      rating: 4.7,
      verified: true,
      memberSince: "2020",
      responseRate: "97%",
      responseTime: "Menos de 2 horas",
    },
    postedAt: "Hace 1 día",
    category: "Tablas",
    details: {
      brand: "Science",
      model: "Style",
      size: '41"',
      purchaseYear: "2022",
      extras: "Incluye quillas y leash",
    },
  },
  {
    id: 6,
    title: "Funda para tabla de bodyboard",
    description:
      "Vendo funda para tabla de bodyboard en buen estado. Es acolchada y tiene correa para transportar. Protege muy bien la tabla y es fácil de llevar. Tiene algunos signos de uso pero cumple perfectamente su función.",
    price: 12000,
    condition: "Buen estado",
    location: "Mar de Ajó, Buenos Aires",
    images: ["/images/marketplace/funda-bodyboard-profesional.jpeg"],
    seller: {
      id: 106,
      name: "Lucía Pérez",
      avatar: "/images/users/user6.png",
      rating: 4.3,
      verified: false,
      memberSince: "2021",
      responseRate: "90%",
      responseTime: "Menos de 5 horas",
    },
    postedAt: "Hace 4 días",
    category: "Accesorios",
    details: {
      brand: "Creatures",
      model: "Deluxe",
      size: 'Para tablas hasta 43"',
      purchaseYear: "2022",
      extras: "Incluye bolsillo para accesorios",
    },
  },
]

// Productos similares (recomendados)
const similarProducts = [
  {
    id: 7,
    title: "Tabla NMD Element - Buen estado",
    price: 68000,
    condition: "Buen estado",
    image: "/images/marketplace/tabla-similar-1.png",
  },
  {
    id: 8,
    title: "Tabla VS Winchester - Como nueva",
    price: 75000,
    condition: "Como nuevo",
    image: "/images/marketplace/tabla-similar-2.png",
  },
  {
    id: 9,
    title: "Tabla Pride The Answer PE",
    price: 55000,
    condition: "Usado",
    image: "/images/marketplace/tabla-similar-3.png",
  },
]

export default function MarketplaceItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const id = Number.parseInt(params.id)
  const item = marketplaceItems.find((item) => item.id === id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (!item) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-muted-foreground mb-6">El producto que estás buscando no existe o ha sido eliminado.</p>
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
          <Link href="/marketplace">Volver al Marketplace</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Volver al inicio</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="h-8">
            <Link href="/marketplace" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver al Marketplace
            </Link>
          </Button>
        </div>
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>{item.location}</span>
          <span>•</span>
          <span>{item.postedAt}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                <Image
                  src={item.images[selectedImage] || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
                {item.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                      onClick={() => setSelectedImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-auto pb-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                        selectedImage === index ? "ring-2 ring-cyan-600" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${item.title} - Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="details">Detalles</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-4">
                    <p className="text-muted-foreground">{item.description}</p>
                  </TabsContent>
                  <TabsContent value="details" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b pb-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Productos similares</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarProducts.map((product) => (
                  <Link key={product.id} href={`/marketplace/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                        <p className="text-lg font-bold mt-2">${product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Tag className="h-3 w-3" />
                          <span>{product.condition}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-6 sticky top-20">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">${item.price.toLocaleString()}</h2>
                    <Badge variant="outline" className="text-cyan-600 border-cyan-600">
                      <Shield className="h-3 w-3 mr-1" /> Seguro
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">{item.condition}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.seller.avatar || "/placeholder.svg"} alt={item.seller.name} />
                      <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{item.seller.name}</span>
                        {item.seller.verified && <VerificationBadge size="sm" />}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>
                          {item.seller.rating} • Miembro desde {item.seller.memberSince}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa de respuesta:</span>
                      <span>{item.seller.responseRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tiempo de respuesta:</span>
                      <span>{item.seller.responseTime}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={() => setIsChatOpen(true)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contactar al vendedor
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-500 hover:text-red-600 bg-transparent">
                      <Flag className="h-4 w-4 mr-2" />
                      Reportar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Consejos de seguridad</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span>Nunca pagues por adelantado sin verificar el producto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span>Reúnete en lugares públicos para ver el producto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span>Verifica el estado del producto antes de comprarlo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span>Reporta cualquier actividad sospechosa</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatDialog open={isChatOpen} onOpenChange={setIsChatOpen} seller={item.seller} product={item} />
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Grid, List, Plus, Search, Shield, Tag, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MarketplaceFilters, type FilterState } from "@/components/marketplace-filters"
import { VerificationBadge } from "@/components/verification-badge"

// Datos de ejemplo para el marketplace
const marketplaceItems = [
  {
    id: 1,
    title: "Tabla Pride The Answer PP - Poco uso",
    description:
      "Vendo mi tabla Pride The Answer con muy poco uso, en excelente estado. La vendo porque me compré otra.",
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
    },
    postedAt: "Hace 2 días",
    category: "Tablas",
  },
  {
    id: 2,
    title: "Patas de rana Churchill - Talle 42",
    description: "Vendo patas de rana Churchill en buen estado. Talle 42. Las usé durante una temporada.",
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
    },
    postedAt: "Hace 5 días",
    category: "Patas de Rana",
  },
  {
    id: 3,
    title: "Traje de neoprene Rip Curl 3/2mm",
    description:
      "Vendo traje de neoprene Rip Curl 3/2mm en buen estado. Talle M. Tiene algunos parches pero está en buen estado general.",
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
    },
    postedAt: "Hace 1 semana",
    category: "Trajes",
  },
  {
    id: 4,
    title: "Leash Bodyboard Pro - Como nuevo",
    description: "Vendo leash Bodyboard Pro prácticamente sin uso. Lo compré pero casi no lo usé.",
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
    },
    postedAt: "Hace 3 días",
    category: "Accesorios",
  },
  {
    id: 5,
    title: "Tabla Science Style - Excelente estado",
    description: "Vendo tabla Science Style en excelente estado. La usé muy poco, está casi nueva.",
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
    },
    postedAt: "Hace 1 día",
    category: "Tablas",
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

export default function MarketplacePage() {
  const router = useRouter()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 150000],
    selectedCategories: [],
    selectedConditions: [],
    selectedLocations: [],
    verifiedSellers: false,
    highRating: false,
  })

  // Memoizar la función de cambio de filtros para evitar recrearla en cada renderizado
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  // Aplicar filtros y búsqueda
  const filteredItems = useMemo(() => {
    const filtered = marketplaceItems.filter((item) => {
      // Filtro de búsqueda
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtro de precio
      const matchesPrice = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]

      // Filtro de categoría
      const matchesCategory =
        filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.category)

      // Filtro de condición
      const matchesCondition =
        filters.selectedConditions.length === 0 || filters.selectedConditions.includes(item.condition)

      // Filtro de ubicación
      const matchesLocation =
        filters.selectedLocations.length === 0 || filters.selectedLocations.includes(item.location)

      // Filtro de vendedores verificados
      const matchesVerified = !filters.verifiedSellers || item.seller.verified

      // Filtro de calificación alta
      const matchesRating = !filters.highRating || item.seller.rating >= 4.0

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCategory &&
        matchesCondition &&
        matchesLocation &&
        matchesVerified &&
        matchesRating
      )
    })

    // Aplicar ordenamiento
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "condition":
        const conditionOrder = { "Como nuevo": 4, "Casi nuevo": 3, "Buen estado": 2, Usado: 1 }
        filtered.sort(
          (a, b) =>
            (conditionOrder[b.condition as keyof typeof conditionOrder] || 0) -
            (conditionOrder[a.condition as keyof typeof conditionOrder] || 0),
        )
        break
      case "recent":
      default:
        // Ya están ordenados por fecha (más recientes primero)
        break
    }

    return filtered
  }, [searchQuery, filters, sortBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda se aplica automáticamente a través del useMemo
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 bg-transparent">
                <Link href="/">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Volver al inicio</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Marketplace</h1>
            </div>
            <p className="text-muted-foreground">
              Compra y vende productos de bodyboard usados directamente de otros miembros de la comunidad.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-64 flex-shrink-0">
            <MarketplaceFilters onFiltersChange={handleFiltersChange} itemCount={filteredItems.length} />
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg border p-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Buscar en Marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="default" className="bg-cyan-600 hover:bg-cyan-700">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Buscar</span>
                </Button>
              </form>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Productos ({filteredItems.length})</h2>
                <Badge variant="outline" className="text-cyan-600 border-cyan-600">
                  <Shield className="h-3 w-3 mr-1" /> Verificado
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Vista de cuadrícula</span>
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                  className={view === "list" ? "bg-cyan-600 hover:bg-cyan-700" : ""}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">Vista de lista</span>
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                    <SelectItem value="condition">Mejor estado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Publicar producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Publicar un producto</DialogTitle>
                    <DialogDescription>
                      Completa el formulario para publicar tu producto en el Marketplace.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      El formulario de publicación se abrirá en una nueva página.
                    </p>
                    <div className="flex justify-center mt-4">
                      <Button
                        className="bg-cyan-600 hover:bg-cyan-700"
                        onClick={() => router.push("/marketplace/publicar")}
                      >
                        Continuar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No se encontraron productos que coincidan con tus filtros.
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 150000],
                      selectedCategories: [],
                      selectedConditions: [],
                      selectedLocations: [],
                      verifiedSellers: false,
                      highRating: false,
                    })
                  }
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/marketplace/${item.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                          {item.seller.verified && <VerificationBadge size="sm" />}
                        </div>
                        <p className="text-xl font-bold mt-2">${item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Tag className="h-3 w-3" />
                          <span>{item.condition}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{item.location}</div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.seller.avatar || "/placeholder.svg"} alt={item.seller.name} />
                            <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{item.seller.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.postedAt}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/marketplace/${item.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex">
                        <div className="w-40 h-40 relative flex-shrink-0">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{item.title}</h3>
                            {item.seller.verified && <VerificationBadge size="sm" />}
                          </div>
                          <p className="text-xl font-bold mt-2">${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3 w-3" />
                            <span>{item.condition}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{item.location}</div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={item.seller.avatar || "/placeholder.svg"} alt={item.seller.name} />
                                <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{item.seller.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{item.postedAt}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

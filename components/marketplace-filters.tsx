"use client"

import { useState, useEffect } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export interface FilterState {
  priceRange: [number, number]
  selectedCategories: string[]
  selectedConditions: string[]
  selectedLocations: string[]
  verifiedSellers: boolean
  highRating: boolean
}

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  itemCount: number
}

export function MarketplaceFilters({ onFiltersChange, itemCount }: MarketplaceFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [verifiedSellers, setVerifiedSellers] = useState(false)
  const [highRating, setHighRating] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const categories = [
    { id: "Tablas", label: "Tablas" },
    { id: "Patas de Rana", label: "Patas de Rana" },
    { id: "Trajes", label: "Trajes de Neoprene" },
    { id: "Accesorios", label: "Accesorios" },
  ]

  const conditions = [
    { id: "Como nuevo", label: "Como nuevo" },
    { id: "Casi nuevo", label: "Casi nuevo" },
    { id: "Buen estado", label: "Buen estado" },
    { id: "Usado", label: "Usado" },
  ]

  const locations = [
    { id: "Mar del Plata, Buenos Aires", label: "Mar del Plata" },
    { id: "Pinamar, Buenos Aires", label: "Pinamar" },
    { id: "Villa Gesell, Buenos Aires", label: "Villa Gesell" },
    { id: "Miramar, Buenos Aires", label: "Miramar" },
    { id: "Mar de Ajó, Buenos Aires", label: "Mar de Ajó" },
  ]

  // Actualizar filtros cuando cambien los valores
  useEffect(() => {
    const filters: FilterState = {
      priceRange,
      selectedCategories,
      selectedConditions,
      selectedLocations,
      verifiedSellers,
      highRating,
    }
    onFiltersChange(filters)
    // Eliminamos onFiltersChange de las dependencias para evitar el bucle infinito
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, selectedCategories, selectedConditions, selectedLocations, verifiedSellers, highRating])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId) ? prev.filter((id) => id !== conditionId) : [...prev, conditionId],
    )
  }

  const toggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 150000])
    setSelectedCategories([])
    setSelectedConditions([])
    setSelectedLocations([])
    setVerifiedSellers(false)
    setHighRating(false)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (priceRange[0] > 0 || priceRange[1] < 150000) count++
    if (selectedCategories.length > 0) count++
    if (selectedConditions.length > 0) count++
    if (selectedLocations.length > 0) count++
    if (verifiedSellers) count++
    if (highRating) count++
    return count
  }

  const FiltersContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
          Limpiar filtros
        </Button>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">{itemCount} productos encontrados</div>

      <Accordion type="multiple" defaultValue={["price", "category", "condition"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={150000}
                step={1000}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <div className="border rounded-md px-2 py-1 text-sm">${priceRange[0].toLocaleString()}</div>
                <div className="border rounded-md px-2 py-1 text-sm">${priceRange[1].toLocaleString()}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>
            Categoría
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedCategories.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger>
            Estado
            {selectedConditions.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedConditions.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition.id}`}
                    checked={selectedConditions.includes(condition.id)}
                    onCheckedChange={() => toggleCondition(condition.id)}
                  />
                  <Label htmlFor={`condition-${condition.id}`}>{condition.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>
            Ubicación
            {selectedLocations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedLocations.length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location.id}`}
                    checked={selectedLocations.includes(location.id)}
                    onCheckedChange={() => toggleLocation(location.id)}
                  />
                  <Label htmlFor={`location-${location.id}`}>{location.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seller">
          <AccordionTrigger>
            Vendedor
            {(verifiedSellers || highRating) && (
              <Badge variant="secondary" className="ml-2">
                {[verifiedSellers, highRating].filter(Boolean).length}
              </Badge>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified-sellers"
                  checked={verifiedSellers}
                  onCheckedChange={(checked) => setVerifiedSellers(checked as boolean)}
                />
                <Label htmlFor="verified-sellers">Solo vendedores verificados</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high-rating"
                  checked={highRating}
                  onCheckedChange={(checked) => setHighRating(checked as boolean)}
                />
                <Label htmlFor="high-rating">Calificación 4+ estrellas</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )

  return (
    <>
      {/* Filtros para escritorio */}
      <Card className="sticky top-20 hidden md:block">
        <CardContent className="p-4">
          <FiltersContent />
        </CardContent>
      </Card>

      {/* Botón para mostrar filtros en móvil */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setShowMobileFilters(true)}
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </span>
          <div className="flex gap-1">
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="rounded-sm">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
        </Button>

        {/* Panel de filtros móvil */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Filtros</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <Separator className="mb-4" />
              <FiltersContent />
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={() => setShowMobileFilters(false)}>
                  Ver {itemCount} productos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

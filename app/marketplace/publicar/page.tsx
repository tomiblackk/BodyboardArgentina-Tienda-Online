"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Info, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BackButton } from "@/components/back-button"

export default function PublishProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = () => {
    setUploading(true)
    // Simulate image upload
    setTimeout(() => {
      const newImage = `/images/marketplace/upload-${Math.floor(Math.random() * 5) + 1}.jpg`
      setImages((prev) => [...prev, newImage])
      setUploading(false)
      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente.",
      })
    }, 1500)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Producto publicado",
      description: "Tu producto ha sido publicado correctamente en el Marketplace.",
    })
    router.push("/marketplace")
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <BackButton href="/marketplace" label="Volver al Marketplace" />
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Publicar un producto</CardTitle>
            <CardDescription>Completa el formulario para publicar tu producto en el Marketplace.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="images">Fotos del producto</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sube fotos claras y de buena calidad de tu producto.</p>
                        <p>Puedes subir hasta 5 fotos.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="aspect-square flex flex-col items-center justify-center border-dashed bg-transparent"
                      onClick={handleImageUpload}
                      disabled={uploading}
                    >
                      <Upload className="h-6 w-6 mb-1" />
                      <span className="text-xs">{uploading ? "Subiendo..." : "Subir"}</span>
                    </Button>
                  )}
                  {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square rounded-md border border-dashed flex items-center justify-center text-muted-foreground"
                    >
                      <span className="text-xs">Foto {images.length + index + 2}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ej: Tabla Pride The Answer - Poco uso"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe tu producto, su estado, detalles importantes, etc."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (ARS)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Ej: 65000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tablas">Tablas</SelectItem>
                      <SelectItem value="patas">Patas de Rana</SelectItem>
                      <SelectItem value="trajes">Trajes de Neoprene</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">Estado</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    required
                  >
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="como-nuevo">Como nuevo</SelectItem>
                      <SelectItem value="casi-nuevo">Casi nuevo</SelectItem>
                      <SelectItem value="buen-estado">Buen estado</SelectItem>
                      <SelectItem value="usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Selecciona tu ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mar-del-plata">Mar del Plata, Buenos Aires</SelectItem>
                      <SelectItem value="pinamar">Pinamar, Buenos Aires</SelectItem>
                      <SelectItem value="villa-gesell">Villa Gesell, Buenos Aires</SelectItem>
                      <SelectItem value="miramar">Miramar, Buenos Aires</SelectItem>
                      <SelectItem value="mar-de-ajo">Mar de Ajó, Buenos Aires</SelectItem>
                      <SelectItem value="otra">Otra ubicación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Consejos para vender rápido</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Usa fotos claras y de buena calidad</li>
                  <li>• Describe el producto con detalle y honestidad</li>
                  <li>• Establece un precio justo y competitivo</li>
                  <li>• Responde rápido a los mensajes de los compradores</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/marketplace")}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                  Publicar producto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Info, Upload, X, Loader2, ShieldAlert } from "lucide-react"

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
import { useProfile } from "@/contexts/profile-context"
import Link from "next/link"

export default function PublishProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { profile, isLoading: profileLoading } = useProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Archivo no valido",
        description: "Solo se permiten archivos de imagen.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo no puede superar los 5MB.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append("file", file)

      const res = await fetch("/api/marketplace/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      setImages((prev) => [...prev, data.url])
      toast({
        title: "Imagen subida",
        description: "La imagen se ha subido correctamente.",
      })
    } catch {
      toast({
        title: "Error al subir imagen",
        description: "Hubo un problema al subir la imagen. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        title: "Imagenes requeridas",
        description: "Subi al menos una foto del producto.",
        variant: "destructive",
      })
      return
    }

    if (!formData.category || !formData.condition || !formData.location) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos del formulario.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/marketplace/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images,
          sellerProfileId: profile.id,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to publish")
      }

      toast({
        title: "Producto publicado",
        description: "Tu producto ha sido publicado correctamente en el Marketplace.",
      })
      router.push("/marketplace")
    } catch {
      toast({
        title: "Error al publicar",
        description: "Hubo un problema al publicar tu producto. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!profile) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <BackButton href="/marketplace" label="Volver al Marketplace" />
        </div>
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700 mb-2">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <CardTitle>Perfil requerido</CardTitle>
              <CardDescription>
                Para publicar un producto en el Marketplace necesitas crear un perfil primero. Esto nos ayuda a verificar que sos una persona real.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                <Link href="/perfil">Crear mi perfil</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/marketplace">Volver al Marketplace</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
                        <p>Subi fotos claras y de buena calidad de tu producto.</p>
                        <p>Podes subir hasta 5 fotos.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <div className="grid grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
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
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          <Upload className="h-6 w-6 mb-1" />
                          <span className="text-xs">Subir</span>
                        </>
                      )}
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
                <Label htmlFor="title">Titulo</Label>
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
                <Label htmlFor="description">Descripcion</Label>
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
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona una categoria" />
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
                  <Label htmlFor="location">Ubicacion</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Selecciona tu ubicacion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mar-del-plata">Mar del Plata, Buenos Aires</SelectItem>
                      <SelectItem value="pinamar">Pinamar, Buenos Aires</SelectItem>
                      <SelectItem value="villa-gesell">Villa Gesell, Buenos Aires</SelectItem>
                      <SelectItem value="miramar">Miramar, Buenos Aires</SelectItem>
                      <SelectItem value="mar-de-ajo">Mar de Ajo, Buenos Aires</SelectItem>
                      <SelectItem value="otra">Otra ubicacion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">Consejos para vender rapido</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Usa fotos claras y de buena calidad</li>
                  <li>Describe el producto con detalle y honestidad</li>
                  <li>Establece un precio justo y competitivo</li>
                  <li>Responde rapido a los mensajes de los compradores</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/marketplace")}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar producto"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

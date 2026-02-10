"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, MapPin, Loader2, LogIn, UserPlus, CheckCircle2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { useProfile } from "@/contexts/profile-context"

const cities = [
  "Mar del Plata",
  "Buenos Aires (CABA)",
  "Pinamar",
  "Villa Gesell",
  "Miramar",
  "Mar de Ajo",
  "Necochea",
  "Bahia Blanca",
  "La Plata",
  "Rosario",
  "Cordoba",
  "Mendoza",
  "Otra",
]

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { profile, isLoading, login, register, logout } = useProfile()
  const [tab, setTab] = useState<string>("crear")

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
  })

  const [loginEmail, setLoginEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.phone || !registerData.city) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      await register(registerData)
      toast({
        title: "Perfil creado",
        description: "Tu perfil ha sido creado correctamente. Ya podes publicar productos.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el perfil.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail) {
      toast({
        title: "Email requerido",
        description: "Ingresa tu email para iniciar sesion.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const found = await login(loginEmail)
      if (found) {
        toast({
          title: "Sesion iniciada",
          description: `Bienvenido, ${found.firstName}!`,
        })
      } else {
        toast({
          title: "Perfil no encontrado",
          description: "No existe un perfil con este email. Crea una cuenta primero.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "No se pudo iniciar sesion.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Sesion cerrada",
      description: "Has cerrado sesion correctamente.",
    })
  }

  // If the user is logged in, show the profile view
  if (profile) {
    return (
      <>
        <Header />
        <main className="container py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Mi Perfil</CardTitle>
                <CardDescription>Tu perfil esta verificado y activo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">{profile.firstName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Apellido</p>
                    <p className="font-medium">{profile.lastName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> Telefono
                    </p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Ciudad
                    </p>
                    <p className="font-medium">{profile.city}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => router.push("/marketplace/publicar")}
                  >
                    Publicar un producto
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    )
  }

  // Not logged in - show login / register tabs
  return (
    <>
      <Header />
      <main className="container py-8">
        <div className="max-w-lg mx-auto">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="crear" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Crear Cuenta
              </TabsTrigger>
              <TabsTrigger value="ingresar" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesion
              </TabsTrigger>
            </TabsList>

            {/* Register tab */}
            <TabsContent value="crear">
              <Card>
                <CardHeader>
                  <CardTitle>Crear tu perfil</CardTitle>
                  <CardDescription>
                    Completa tus datos para verificar tu identidad y poder publicar productos en el Marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="Tu nombre"
                            className="pl-9"
                            value={registerData.firstName}
                            onChange={(e) =>
                              setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            placeholder="Tu apellido"
                            className="pl-9"
                            value={registerData.lastName}
                            onChange={(e) =>
                              setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-9"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefono de contacto</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+54 223 456 7890"
                          className="pl-9"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad donde vivis</Label>
                      <Select
                        value={registerData.city}
                        onValueChange={(value) =>
                          setRegisterData((prev) => ({ ...prev, city: value }))
                        }
                        required
                      >
                        <SelectTrigger id="city">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <Button
                      type="submit"
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                      disabled={submitting || isLoading}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creando perfil...
                        </>
                      ) : (
                        "Crear perfil"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Login tab */}
            <TabsContent value="ingresar">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar sesion</CardTitle>
                  <CardDescription>
                    Ingresa el email con el que creaste tu perfil para acceder a tu cuenta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-9"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                      disabled={submitting || isLoading}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Buscando perfil...
                        </>
                      ) : (
                        "Iniciar sesion"
                      )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      No tenes cuenta?{" "}
                      <button
                        type="button"
                        className="text-cyan-600 hover:underline font-medium"
                        onClick={() => setTab("crear")}
                      >
                        Crea tu perfil
                      </button>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}

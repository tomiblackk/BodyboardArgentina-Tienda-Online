"use client"

import { Truck, Clock, MapPin, Package, Shield, CreditCard } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold">Información de Envíos</h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Enviamos a toda Argentina</h2>
              <p className="text-lg text-muted-foreground">
                Recibí tus productos de bodyboard de forma rápida y segura en todo el país.
              </p>
            </div>

            {/* Shipping Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-600" />
                    Envío Estándar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">CABA y GBA:</span>
                      <span>3-5 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Interior del país:</span>
                      <span>5-7 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Costo:</span>
                      <span>Desde $5.000</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-full justify-center">
                    Más económico
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-orange-600" />
                    Envío Express
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">CABA y GBA:</span>
                      <span>1-2 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Principales ciudades:</span>
                      <span>2-3 días hábiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Costo:</span>
                      <span>Desde $8.000</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-full justify-center text-orange-600 border-orange-600">
                    Más rápido
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Free Shipping */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">¡Envío Gratis!</h3>
                    <p className="text-green-700">En compras superiores a $100.000 a todo el país</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Option */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Retiro en Local
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Podés retirar tu pedido sin costo en nuestro local en Mar del Plata.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Dirección:</h4>
                  <p>Av. del Mar 1234, Mar del Plata, Buenos Aires</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Horarios:</strong> Lunes a Viernes 9:00 - 18:00, Sábados 10:00 - 14:00
                  </p>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Sin costo
                </Badge>
              </CardContent>
            </Card>

            <Separator />

            {/* Shipping Process */}
            <div>
              <h2 className="text-2xl font-bold mb-6">¿Cómo funciona el envío?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Realizás tu pedido</h3>
                  <p className="text-sm text-muted-foreground">Elegís tus productos y completás la compra</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Preparamos tu pedido</h3>
                  <p className="text-sm text-muted-foreground">Empacamos cuidadosamente tus productos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Enviamos tu pedido</h3>
                  <p className="text-sm text-muted-foreground">Te enviamos el código de seguimiento</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold mb-2">4. Recibís tu pedido</h3>
                  <p className="text-sm text-muted-foreground">Tu pedido llega seguro a tu domicilio</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Important Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Información Importante</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">📦 Empaque</h3>
                    <p className="text-muted-foreground">
                      Todos los productos se envían en empaques resistentes y con protección adicional para productos
                      frágiles.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">📱 Seguimiento</h3>
                    <p className="text-muted-foreground">
                      Recibirás un código de seguimiento por email para rastrear tu pedido en tiempo real.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">🏠 Entrega</h3>
                    <p className="text-muted-foreground">
                      El transportista intentará la entrega hasta 3 veces. Si no estás, podrás coordinar una nueva
                      entrega.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">🔒 Seguridad</h3>
                    <p className="text-muted-foreground">
                      Todos los envíos están asegurados contra pérdida o daño durante el transporte.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

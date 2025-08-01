"use client"

import { Shield, Clock, RefreshCw, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"

export default function WarrantyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold">Política de Garantía</h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Garantía de Calidad</h2>
              <p className="text-lg text-muted-foreground">
                Respaldamos la calidad de todos nuestros productos con garantías completas.
              </p>
            </div>

            {/* Warranty Periods */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Períodos de Garantía</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Tablas de Bodyboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span className="font-semibold">6 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Contra defectos de fabricación y materiales</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Patas de Rana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span className="font-semibold">3 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Contra defectos de fabricación</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Trajes de Neoprene</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span className="font-semibold">6 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Contra defectos en costuras y materiales</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Accesorios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-cyan-600" />
                      <span className="font-semibold">3 meses</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Contra defectos de fabricación</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* What's Covered */}
            <div>
              <h2 className="text-2xl font-bold mb-6">¿Qué cubre la garantía?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      Cubierto por Garantía
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Defectos de fabricación en materiales</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Fallas en costuras (trajes de neoprene)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Despegue de laminados (tablas)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Defectos en hebillas y cierres</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Problemas de flotabilidad (patas de rana)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-800">
                      <XCircle className="h-5 w-5" />
                      No Cubierto por Garantía
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Daños por uso normal y desgaste</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Daños causados por accidentes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Mal uso o negligencia</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Modificaciones no autorizadas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Daños por exposición excesiva al sol</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Warranty Process */}
            <div>
              <h2 className="text-2xl font-bold mb-6">¿Cómo hacer un reclamo de garantía?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-cyan-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Contactanos</h3>
                  <p className="text-sm text-muted-foreground">
                    Envianos un email con tu número de pedido y fotos del problema
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-cyan-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Evaluación</h3>
                  <p className="text-sm text-muted-foreground">Nuestro equipo evalúa el reclamo en 24-48 horas</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-cyan-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Solución</h3>
                  <p className="text-sm text-muted-foreground">
                    Te ofrecemos reemplazo, reparación o reembolso según el caso
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-cyan-600">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Resolución</h3>
                  <p className="text-sm text-muted-foreground">Procesamos la solución en 3-5 días hábiles</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Return Policy */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Política de Devoluciones</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">30 días para devoluciones</h3>
                        <p className="text-muted-foreground">
                          Podés devolver cualquier producto dentro de los 30 días de la compra si no estás satisfecho.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Condiciones:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Producto sin usar</li>
                            <li>• Empaque original</li>
                            <li>• Etiquetas intactas</li>
                            <li>• Comprobante de compra</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Proceso:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Contactá a nuestro equipo</li>
                            <li>• Enviá el producto</li>
                            <li>• Reembolso en 5-7 días</li>
                            <li>• Gastos de envío a cargo del cliente</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Notes */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-yellow-800">
                  • La garantía comienza desde la fecha de compra y requiere comprobante.
                </p>
                <p className="text-sm text-yellow-800">
                  • Los productos del Marketplace tienen garantía directa del vendedor.
                </p>
                <p className="text-sm text-yellow-800">
                  • Para reclamos de garantía, conservá el empaque original cuando sea posible.
                </p>
                <p className="text-sm text-yellow-800">
                  • Los gastos de envío para reclamos de garantía son cubiertos por nosotros.
                </p>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">¿Necesitás hacer un reclamo de garantía?</h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestro equipo está listo para ayudarte con cualquier problema con tu producto.
                  </p>
                  <Button className="bg-cyan-600 hover:bg-cyan-700" asChild>
                    <a href="/contacto">Contactar Soporte</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

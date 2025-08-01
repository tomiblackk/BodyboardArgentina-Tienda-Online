"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { CheckoutDialog } from "@/components/checkout-dialog"
import { useCart } from "@/contexts/cart-context"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const shipping = state.totalPrice > 0 ? 5000 : 0
  const total = state.totalPrice + shipping

  // Preparar items para el checkout
  const checkoutItems = state.items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price,
    quantity: item.quantity,
    image: item.image,
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <BackButton href="/" />
            <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          </div>

          {state.items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {state.items.map((item) => {
                    const finalPrice =
                      item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price

                    return (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <Link href={`/producto/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              {item.discount > 0 ? (
                                <div className="space-x-2">
                                  <span className="font-medium">${finalPrice.toLocaleString()}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${item.price.toLocaleString()}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-medium">${item.price.toLocaleString()}</span>
                              )}
                              <div className="text-sm text-muted-foreground">
                                Total: ${(finalPrice * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6">
                  <Button variant="outline" asChild className="flex items-center gap-2 bg-transparent">
                    <Link href="/productos/tablas">Continuar comprando</Link>
                  </Button>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen del pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({state.totalItems} productos)</span>
                      <span>${state.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>${shipping.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>

                    <div className="pt-4">
                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium">Código de descuento</div>
                        <div className="flex gap-2">
                          <Input placeholder="Ingresa tu código" />
                          <Button variant="outline">Aplicar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700" onClick={() => setIsCheckoutOpen(true)}>
                      Finalizar compra
                    </Button>
                  </CardFooter>
                </Card>

                {/* Información adicional */}
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Información de envío</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Envío gratis en compras superiores a $100.000</li>
                      <li>• Entrega en 3-5 días hábiles</li>
                      <li>• Seguimiento en tiempo real</li>
                      <li>• Garantía de satisfacción</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">Parece que aún no has agregado productos a tu carrito.</p>
              <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                <Link href="/productos/tablas">Explorar productos</Link>
              </Button>
            </div>
          )}

          {/* Dialog de checkout */}
          <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} total={total} items={checkoutItems} />
        </div>
      </main>
    </div>
  )
}

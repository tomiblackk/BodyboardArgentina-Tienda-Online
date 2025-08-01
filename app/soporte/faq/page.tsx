"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"

const faqData = [
  {
    category: "Pedidos y Compras",
    questions: [
      {
        question: "¿Cómo puedo realizar un pedido?",
        answer:
          "Puedes realizar un pedido navegando por nuestros productos, agregándolos al carrito y siguiendo el proceso de checkout. Aceptamos múltiples métodos de pago incluyendo tarjetas de crédito, Mercado Pago y transferencia bancaria.",
      },
      {
        question: "¿Puedo modificar o cancelar mi pedido?",
        answer:
          "Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizarlo, siempre que no haya sido procesado para envío. Contáctanos inmediatamente si necesitas hacer cambios.",
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), Mercado Pago, transferencia bancaria y pago contra entrega en algunas zonas.",
      },
    ],
  },
  {
    category: "Envíos y Entregas",
    questions: [
      {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer:
          "Los envíos dentro de Argentina tardan entre 3-5 días hábiles para CABA y GBA, y 5-7 días hábiles para el interior del país. Los envíos express están disponibles en algunas zonas.",
      },
      {
        question: "¿Hacen envíos a todo el país?",
        answer:
          "Sí, realizamos envíos a toda Argentina. Los costos de envío se calculan automáticamente según tu ubicación durante el checkout.",
      },
      {
        question: "¿Puedo retirar mi pedido en persona?",
        answer:
          "Sí, ofrecemos retiro en nuestro local en Mar del Plata. Selecciona la opción 'Retiro en local' durante el checkout y te notificaremos cuando esté listo.",
      },
    ],
  },
  {
    category: "Productos",
    questions: [
      {
        question: "¿Cómo elijo la talla correcta de tabla?",
        answer:
          "La talla de la tabla depende de tu altura, peso y nivel de experiencia. En cada producto encontrarás una guía de tallas. Si tienes dudas, contáctanos y te ayudaremos a elegir.",
      },
      {
        question: "¿Los productos tienen garantía?",
        answer:
          "Todos nuestros productos tienen garantía del fabricante. Las tablas tienen 6 meses de garantía por defectos de fabricación, y los accesorios 3 meses.",
      },
      {
        question: "¿Puedo devolver un producto si no me gusta?",
        answer:
          "Sí, tienes 30 días para devolver productos en perfecto estado. El producto debe estar sin usar y en su empaque original. Los gastos de envío de devolución corren por cuenta del cliente.",
      },
    ],
  },
  {
    category: "Marketplace",
    questions: [
      {
        question: "¿Cómo funciona el Marketplace?",
        answer:
          "Nuestro Marketplace permite a los usuarios comprar y vender productos de bodyboard usados. Los vendedores publican sus productos y los compradores pueden contactarlos directamente.",
      },
      {
        question: "¿Es seguro comprar en el Marketplace?",
        answer:
          "Recomendamos siempre verificar el producto antes de comprarlo y realizar transacciones en lugares públicos. Los vendedores verificados tienen un badge especial que indica mayor confiabilidad.",
      },
      {
        question: "¿Cómo puedo vender mis productos?",
        answer:
          "Puedes crear una cuenta y publicar tus productos en el Marketplace. Es gratis publicar y solo cobramos una pequeña comisión cuando se realiza la venta.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold">Preguntas Frecuentes</h1>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </p>

            <div className="space-y-8">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-4 text-cyan-600">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const itemId = `${categoryIndex}-${questionIndex}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <Card key={questionIndex}>
                          <Collapsible open={isOpen} onOpenChange={() => toggleItem(itemId)}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between p-6 h-auto text-left font-medium hover:bg-muted/50"
                              >
                                <span className="text-lg">{faq.question}</span>
                                {isOpen ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CardContent className="pt-0 pb-6 px-6">
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">¿No encontraste lo que buscabas?</h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta adicional.
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

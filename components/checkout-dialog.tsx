"use client"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, Building, DollarSign, Lock, ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
}

export function CheckoutDialog({ open, onOpenChange, total, items }: CheckoutDialogProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderNumber] = useState(() => Math.floor(Math.random() * 10000))
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setStep(4) // Paso de confirmación

    toast({
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido procesado correctamente.",
    })
  }

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Tarjeta de Crédito/Débito",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      logos: ["/images/payments/visa.png", "/images/payments/mastercard.png", "/images/payments/amex.png"],
    },
    {
      id: "mercadopago",
      name: "Mercado Pago",
      description: "Paga con tu cuenta de Mercado Pago",
      icon: Smartphone,
      logos: ["/images/payments/mercadopago.png"],
    },
    {
      id: "bank-transfer",
      name: "Transferencia Bancaria",
      description: "Transferencia o depósito bancario",
      icon: Building,
      logos: ["/images/payments/banco.png"],
    },
    {
      id: "cash",
      name: "Efectivo",
      description: "Pago contra entrega",
      icon: DollarSign,
      logos: [],
    },
  ]

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dirección de envío</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="city">Ciudad</Label>
            <Select onValueChange={(value) => handleInputChange("city", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mar-del-plata">Mar del Plata</SelectItem>
                <SelectItem value="pinamar">Pinamar</SelectItem>
                <SelectItem value="villa-gesell">Villa Gesell</SelectItem>
                <SelectItem value="miramar">Miramar</SelectItem>
                <SelectItem value="caba">CABA</SelectItem>
                <SelectItem value="la-plata">La Plata</SelectItem>
                <SelectItem value="otra">Otra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <Button onClick={() => setStep(2)} className="w-full bg-cyan-600 hover:bg-cyan-700">
        Continuar al pago
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h3 className="text-lg font-semibold">Método de pago</h3>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id}>
              <Label
                htmlFor={method.id}
                className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <method.icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-muted-foreground">{method.description}</div>
                </div>
                <div className="flex gap-2">
                  {method.logos.map((logo, index) => (
                    <div key={index} className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold">LOGO</span>
                    </div>
                  ))}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <Button onClick={() => setStep(3)} disabled={!paymentMethod} className="w-full bg-cyan-600 hover:bg-cyan-700">
        Continuar
      </Button>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h3 className="text-lg font-semibold">Detalles de pago</h3>
      </div>

      {paymentMethod === "credit-card" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Fecha de vencimiento</Label>
              <Input
                id="expiryDate"
                placeholder="MM/AA"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={4}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cardName">Nombre en la tarjeta</Label>
            <Input
              id="cardName"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
            />
          </div>
        </div>
      )}

      {paymentMethod === "mercadopago" && (
        <div className="text-center py-8">
          <Smartphone className="h-16 w-16 mx-auto mb-4 text-cyan-600" />
          <h4 className="text-lg font-semibold mb-2">Mercado Pago</h4>
          <p className="text-muted-foreground mb-4">
            Serás redirigido a Mercado Pago para completar tu pago de forma segura.
          </p>
        </div>
      )}

      {paymentMethod === "bank-transfer" && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Datos para transferencia:</h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Banco:</strong> Banco Galicia
              </p>
              <p>
                <strong>CBU:</strong> 0070055030004567891234
              </p>
              <p>
                <strong>Alias:</strong> BODYBOARD.ARG
              </p>
              <p>
                <strong>Titular:</strong> Bodyboard Argentina S.A.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Una vez realizada la transferencia, envía el comprobante por WhatsApp al +54 11 1234-5678
          </p>
        </div>
      )}

      {paymentMethod === "cash" && (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Pago contra entrega</h4>
            <p className="text-sm text-muted-foreground">
              Pagarás en efectivo cuando recibas tu pedido. Asegúrate de tener el monto exacto.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4" />
        <span>Tu información está protegida con encriptación SSL</span>
      </div>

      <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-cyan-600 hover:bg-cyan-700">
        {isProcessing ? "Procesando..." : `Pagar $${total.toLocaleString()}`}
      </Button>
    </div>
  )

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">¡Pago exitoso!</h3>
        <p className="text-muted-foreground">
          Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold">Número de pedido: #BB-{orderNumber}</p>
        <p className="text-sm text-muted-foreground mt-1">Tiempo estimado de entrega: 3-5 días hábiles</p>
      </div>
      <Button onClick={() => onOpenChange(false)} className="w-full bg-cyan-600 hover:bg-cyan-700">
        Continuar comprando
      </Button>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar compra</DialogTitle>
          <DialogDescription>Completa tu información para procesar el pedido</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen del pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pasos del checkout */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-cyan-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && <div className={`w-8 h-0.5 ${step > stepNumber ? "bg-cyan-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Contenido del paso actual */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

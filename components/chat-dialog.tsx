"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Send, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VerificationBadge } from "@/components/verification-badge"

interface Seller {
  id: number
  name: string
  avatar: string
  verified: boolean
}

interface Product {
  id: number
  title: string
  price: number
  images: string[]
}

interface Message {
  id: number
  senderId: number
  text: string
  timestamp: Date
  isRead: boolean
}

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  seller: Seller
  product: Product
}

export function ChatDialog({ open, onOpenChange, seller, product }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: seller.id,
      text: `¡Hola! Gracias por tu interés en "${product.title}". ¿En qué puedo ayudarte?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      senderId: 0, // User ID
      text: newMessage,
      timestamp: new Date(),
      isRead: true,
    }
    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate seller response after a delay
    setTimeout(() => {
      const sellerResponses = [
        "¡Claro! El producto está disponible. ¿Cuándo te gustaría verlo?",
        "Sí, todavía lo tengo. ¿Tienes alguna pregunta específica sobre el producto?",
        "Podemos coordinar un lugar para que lo veas. ¿Qué te parece?",
        "El estado es exactamente como se ve en las fotos. ¿Te interesa?",
        "¡Perfecto! Podemos acordar un precio si estás interesado.",
      ]
      const randomResponse = sellerResponses[Math.floor(Math.random() * sellerResponses.length)]

      const sellerMessage: Message = {
        id: messages.length + 2,
        senderId: seller.id,
        text: randomResponse,
        timestamp: new Date(),
        isRead: true,
      }
      setMessages((prev) => [...prev, sellerMessage])
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 h-[600px] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="flex items-center gap-1">
                  {seller.name}
                  {seller.verified && <VerificationBadge size="sm" />}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">En línea</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-4 border-b">
          <div className="flex gap-3">
            <div className="w-12 h-12 relative flex-shrink-0 rounded overflow-hidden">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
              <p className="font-bold">${product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === 0 ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === 0 ? "bg-cyan-600 text-white" : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.senderId === 0 ? "text-cyan-100" : "text-muted-foreground"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

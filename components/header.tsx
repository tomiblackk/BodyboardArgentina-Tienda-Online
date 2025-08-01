"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Instagram, Menu, ChevronDown, User, LogIn, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { state } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link href="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
                <div className="space-y-2">
                  <div className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">Tienda</div>
                  <div className="pl-4 space-y-2">
                    <Link href="/productos/tablas" className="block hover:text-primary transition-colors">
                      Tablas
                    </Link>
                    <Link href="/productos/patas-de-rana" className="block hover:text-primary transition-colors">
                      Patas de Rana
                    </Link>
                    <Link href="/productos/trajes" className="block hover:text-primary transition-colors">
                      Trajes de Neoprene
                    </Link>
                    <Link href="/productos/accesorios" className="block hover:text-primary transition-colors">
                      Accesorios
                    </Link>
                    <Link href="/productos/ropa" className="block hover:text-primary transition-colors">
                      Ropa & Merchandising
                    </Link>
                    <Link href="/productos/stickers" className="block hover:text-primary transition-colors">
                      Stickers
                    </Link>
                  </div>
                </div>
                <Link href="/marketplace" className="text-cyan-500 hover:text-cyan-400 transition-colors font-semibold">
                  Marketplace
                </Link>
                <Link href="/sobre-nosotros" className="hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
                <div className="space-y-2">
                  <div className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">Soporte</div>
                  <div className="pl-4 space-y-2">
                    <Link href="/soporte/faq" className="block hover:text-primary transition-colors">
                      Preguntas Frecuentes
                    </Link>
                    <Link href="/soporte/envios" className="block hover:text-primary transition-colors">
                      Envíos
                    </Link>
                    <Link href="/soporte/garantia" className="block hover:text-primary transition-colors">
                      Política de Garantía
                    </Link>
                  </div>
                </div>
                <Link href="/contacto" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
                <div className="border-t pt-4 space-y-2">
                  <div className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">Cuenta</div>
                  <div className="pl-4 space-y-2">
                    <Link href="/iniciar-sesion" className="block hover:text-primary transition-colors">
                      Iniciar Sesión
                    </Link>
                    <Link href="/crear-cuenta" className="block hover:text-primary transition-colors">
                      Crear Cuenta
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Left Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 hover:text-primary transition-colors">
                Tienda
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/productos/tablas" className="w-full">
                  Tablas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/productos/patas-de-rana" className="w-full">
                  Patas de Rana
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/productos/trajes" className="w-full">
                  Trajes de Neoprene
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/productos/accesorios" className="w-full">
                  Accesorios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/productos/ropa" className="w-full">
                  Ropa & Merchandising
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/productos/stickers" className="w-full">
                  Stickers
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/sobre-nosotros" className="hover:text-primary transition-colors">
            Sobre Nosotros
          </Link>
          <Link href="/marketplace" className="text-cyan-500 hover:text-cyan-400 transition-colors font-semibold ml-4">
            Marketplace
          </Link>
        </nav>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-bodyboard-argentina.jpg"
              alt="Bodyboard Argentina Logo"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Right Icons - Always visible */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 hover:text-primary transition-colors text-sm font-medium"
              >
                Soporte
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/soporte/faq" className="w-full">
                  Preguntas Frecuentes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/soporte/envios" className="w-full">
                  Envíos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/soporte/garantia" className="w-full">
                  Política de Garantía
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="https://instagram.com/bodyboardargentina" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-pink-600">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Button>
          </Link>
          <Link href="https://www.facebook.com/bodyboardargentinaa" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
          </Link>

          {/* User Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent">
                <User className="h-5 w-5" />
                <span className="sr-only">Cuenta de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium">Mi Cuenta</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/iniciar-sesion" className="w-full flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/crear-cuenta" className="w-full flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Crear Cuenta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                Inicia sesión para acceder a tu perfil, historial de pedidos y más.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/carrito">
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito ({state.totalItems} productos)</span>
              {state.totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs flex items-center justify-center p-0 min-w-[1.5rem] animate-pulse">
                  {state.totalItems > 99 ? "99+" : state.totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

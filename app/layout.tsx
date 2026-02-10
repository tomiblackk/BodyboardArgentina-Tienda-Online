import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/cart-context"
import { ProfileProvider } from "@/contexts/profile-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bodyboard Argentina - Tu tienda especializada en bodyboard",
  description:
    "Encuentra las mejores tablas, patas de rana, trajes de neoprene y accesorios para bodyboard en Argentina.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProfileProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Tablas",
    image: "/images/categories/tablas-profesionales.jpeg",
    description: "Tablas de bodyboard para todos los niveles",
    slug: "tablas",
  },
  {
    id: 2,
    name: "Patas de Rana",
    image: "/images/categories/patas-profesionales.jpeg",
    description: "Aletas especiales para bodyboard",
    slug: "patas-de-rana",
  },
  {
    id: 3,
    name: "Trajes de Neoprene",
    image: "/images/categories/traje-profesional.jpeg",
    description: "Protección térmica para aguas frías",
    slug: "trajes",
  },
  {
    id: 4,
    name: "Accesorios",
    image: "/images/categories/accesorios-profesionales.jpeg",
    description: "Todo lo que necesitas para completar tu equipo",
    slug: "accesorios",
  },
]

export default function CategorySection() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/productos/${category.slug}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-xl mb-1">{category.name}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

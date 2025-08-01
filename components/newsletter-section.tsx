"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para noticias
const newsData = {
  competencias: [
    {
      id: 1,
      title: "APB World Tour 2025 - Etapa Argentina",
      description: "La etapa argentina del APB World Tour 2025 se realizará en Mar del Plata del 15 al 20 de febrero.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "15-20 Feb 2025",
      location: "Mar del Plata, Argentina",
      url: "/noticias/apb-world-tour-2025",
    },
    {
      id: 2,
      title: "Campeonato Nacional Argentino",
      description: "El Campeonato Nacional Argentino de Bodyboard reunirá a los mejores riders del país.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "5-7 Dic 2024",
      location: "Miramar, Argentina",
      url: "/noticias/campeonato-nacional-2024",
    },
    {
      id: 3,
      title: "Circuito Latinoamericano 2024",
      description: "La última fecha del Circuito Latinoamericano definirá al campeón de la temporada 2024.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "10-12 Nov 2024",
      location: "Arica, Chile",
      url: "/noticias/circuito-latinoamericano-2024",
    },
  ],
  riders: [
    {
      id: 1,
      title: "Iain Campbell se prepara para defender su título mundial",
      description: "El sudafricano Iain Campbell se prepara para defender su título en el APB World Tour 2025.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "28 Oct 2024",
      url: "/noticias/iain-campbell-2025",
    },
    {
      id: 2,
      title: "Entrevista exclusiva con Jared Houston",
      description: "Hablamos con Jared Houston sobre su carrera y sus planes para la próxima temporada.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "15 Oct 2024",
      url: "/noticias/entrevista-jared-houston",
    },
    {
      id: 3,
      title: "Samantha Blomfield rompe récords en el circuito femenino",
      description:
        "La australiana Samantha Blomfield continúa dominando el circuito femenino con actuaciones impresionantes.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      date: "5 Oct 2024",
      url: "/noticias/samantha-blomfield-records",
    },
  ],
  spots: [
    {
      id: 1,
      title: "Pipeline, Hawaii",
      description:
        "Una de las olas más famosas y peligrosas del mundo, Pipeline ofrece tubos perfectos para bodyboarders experimentados.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      location: "Oahu, Hawaii",
      difficulty: "Extrema",
      url: "/spots/pipeline",
    },
    {
      id: 2,
      title: "Teahupoo, Tahití",
      description:
        "Conocida como una de las olas más pesadas del planeta, Teahupoo es un sueño para los bodyboarders de élite.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      location: "Tahití, Polinesia Francesa",
      difficulty: "Extrema",
      url: "/spots/teahupoo",
    },
    {
      id: 3,
      title: "Puerto Escondido, México",
      description: "La 'Pipeline Mexicana' ofrece tubos enormes y potentes, perfectos para el bodyboard de alto nivel.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      location: "Oaxaca, México",
      difficulty: "Alta",
      url: "/spots/puerto-escondido",
    },
    {
      id: 4,
      title: "Mar del Plata, Argentina",
      description: "Las playas de Mar del Plata ofrecen excelentes condiciones para el bodyboard durante todo el año.",
      image: "/images/news/bodyboard-competition-beach.jpg",
      location: "Buenos Aires, Argentina",
      difficulty: "Media",
      url: "/spots/mar-del-plata",
    },
  ],
}

export function NewsletterSection() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "¡Suscripción exitosa!",
      description: "Te has suscrito correctamente a nuestro newsletter.",
    })
    setEmail("")
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Novedades del Bodyboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mantente al día con las últimas noticias, competencias, riders destacados y los mejores spots para practicar
            bodyboard.
          </p>
        </div>

        <Tabs defaultValue="competencias" className="mb-12">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-xl">
              <TabsTrigger value="competencias">Competencias</TabsTrigger>
              <TabsTrigger value="riders">Riders</TabsTrigger>
              <TabsTrigger value="spots">Spots</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="competencias">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData.competencias.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={item.url}>
                      <Button variant="link" className="p-0 h-auto text-cyan-600 hover:text-cyan-700">
                        Leer más <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="riders">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsData.riders.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={item.url}>
                      <Button variant="link" className="p-0 h-auto text-cyan-600 hover:text-cyan-700">
                        Leer más <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spots">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsData.spots.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-white/80">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Badge
                        variant="outline"
                        className={`
                          ${item.difficulty === "Extrema" ? "text-red-600 border-red-600" : ""}
                          ${item.difficulty === "Alta" ? "text-orange-600 border-orange-600" : ""}
                          ${item.difficulty === "Media" ? "text-yellow-600 border-yellow-600" : ""}
                          ${item.difficulty === "Baja" ? "text-green-600 border-green-600" : ""}
                        `}
                      >
                        Dificultad: {item.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={item.url}>
                      <Button variant="link" className="p-0 h-auto text-cyan-600 hover:text-cyan-700">
                        Ver spot <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-cyan-600 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-2">Suscríbete a nuestro Newsletter</h3>
              <p className="text-cyan-100 mb-6">
                Recibe las últimas noticias, eventos y ofertas especiales directamente en tu correo electrónico.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/90 border-0 focus-visible:ring-white"
                  />
                </div>
                <Button type="submit" className="bg-white text-cyan-600 hover:bg-cyan-50">
                  Suscribirse
                </Button>
              </form>
            </div>
            <div className="relative hidden md:block">
              <Image
                src="/images/news/bodyboard-competition-beach.jpg"
                alt="Newsletter Bodyboard Competition"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/noticias">
            <Button variant="outline" size="lg">
              Ver todas las noticias
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

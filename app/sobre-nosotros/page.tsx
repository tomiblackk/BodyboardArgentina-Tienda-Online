"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Heart, Waves, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <BackButton href="/" />
            <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
          </div>

          {/* Hero Section */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden mb-12">
            <Image
              src="/images/community/bodyboard-group-hug.jpeg"
              alt="Comunidad Bodyboard Argentina"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-blue-900/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Una Comunidad Unida por las Olas</h2>
                <p className="text-lg md:text-xl max-w-2xl">
                  Desde 2020, conectando riders y haciendo crecer el bodyboard en Argentina y el mundo
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-lg leading-relaxed space-y-6">
                <p>
                  Desde <strong>2020</strong>, Bodyboard Argentina nació como una comunidad digital impulsada por la
                  pasión por el bodyboard, con el objetivo de visibilizar, conectar y hacer crecer este deporte no solo
                  en nuestro gran país, sino también en el resto del mundo.
                </p>

                <p>
                  A lo largo de los años, fuimos creciendo de forma constante, gracias al apoyo y la participación
                  activa de riders de distintos puntos del país. Hoy, más que una página, somos una red de personas
                  unidas por el mar, la tabla y el deseo de compartir.
                </p>

                <p>
                  Nuestro objetivo siempre fue claro: <strong>aportar valor a la comunidad</strong>. Creamos un espacio
                  donde los bodyboarders pueden descubrir talento local, conectarse entre sí, compartir experiencias, y
                  construir vínculos que trascienden las olas.
                </p>

                <p>
                  Soñamos con una comunidad sólida, inclusiva y activa. Por eso, también impulsamos iniciativas como la
                  organización de limpiezas de playas y espacios públicos, para que las próximas generaciones de riders
                  puedan disfrutar de nuestra increíble costa en condiciones óptimas.
                </p>

                <p>
                  <strong>Bodyboard Argentina es un punto de encuentro.</strong> Un hogar digital donde cada rider puede
                  sentirse parte de algo más grande.
                </p>

                <div className="text-center py-8">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">Bienvenidos.</p>
                  <p className="text-xl text-muted-foreground">Las olas nos esperan.</p>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Comunidad</h3>
                  <p className="text-muted-foreground text-sm">
                    Conectamos riders de todo el país en una gran familia del bodyboard
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Pasión</h3>
                  <p className="text-muted-foreground text-sm">
                    Impulsados por el amor genuino hacia el bodyboard y las olas
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Waves className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Crecimiento</h3>
                  <p className="text-muted-foreground text-sm">
                    Hacemos crecer el deporte y visibilizamos el talento local
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Sustentabilidad</h3>
                  <p className="text-muted-foreground text-sm">
                    Cuidamos nuestras playas para las futuras generaciones
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Community Images */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-8">Nuestra Comunidad en Acción</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/news/bodyboard-competition-beach.jpg"
                    alt="Competencia de bodyboard"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/community/rider-in-barrel.jpeg"
                    alt="Rider en el tubo de una ola perfecta"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/backgrounds/perfect-wave-tube.jpeg"
                    alt="Ola perfecta"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">¿Querés ser parte de nuestra comunidad?</h2>
              <p className="text-lg mb-6">
                Únete a miles de riders que ya forman parte de la familia Bodyboard Argentina
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100" asChild>
                  <Link href="https://instagram.com/bodyboardargentina" target="_blank" rel="noopener noreferrer">
                    Síguenos en Instagram
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/contacto">Contactanos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

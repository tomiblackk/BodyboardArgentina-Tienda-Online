"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Header } from "@/components/header"
import { ScrollProgress } from "@/components/scroll-progress"
import { AnimatedSection } from "@/components/animated-section"
import { VideoHero } from "@/components/video-hero"
import { StaggerContainer } from "@/components/stagger-container"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        {/* Hero Section with Video */}
        <VideoHero
          videoSrc="/videos/bodyboard-wave.mp4"
          posterImage="/images/backgrounds/hero-perfect-wave.jpeg"
          height="100vh"
        >
          <div className="container">
            <AnimatedSection animation="slideUp" className="max-w-2xl space-y-6 text-white">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-lg">
                Bodyboard Argentina
              </h1>
              <p className="text-xl sm:text-2xl leading-relaxed drop-shadow-md">
                Todo lo que necesitas para disfrutar del bodyboard en las mejores playas argentinas. Equipos de alta
                calidad para riders de todos los niveles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 shadow-lg"
                  asChild
                >
                  <Link href="/productos/tablas">Ver Productos</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 shadow-lg"
                  asChild
                >
                  <Link href="/marketplace">Explorar Marketplace</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </VideoHero>

        {/* Categories Section with Animation */}
        <AnimatedSection animation="fadeIn">
          <CategorySection />
        </AnimatedSection>

        {/* Featured Products with Stagger Animation */}
        <AnimatedSection animation="slideUp">
          <FeaturedProducts />
        </AnimatedSection>

        {/* Perfect Wave Section with Parallax */}
        <AnimatedSection animation="scaleIn">
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/backgrounds/perfect-wave-tube.jpeg"
                alt="Ola perfecta formando tubo"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 via-cyan-800/70 to-blue-900/90"></div>
            <div className="container relative z-10">
              <div className="max-w-4xl mx-auto text-center text-white space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">Vive la Experiencia del Tubo Perfecto</h2>
                <p className="text-xl md:text-2xl leading-relaxed">
                  Cada ola es una oportunidad única. Con nuestros equipos profesionales, estarás listo para aprovechar
                  cada momento en el agua y vivir la adrenalina del bodyboard al máximo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-cyan-900 hover:bg-gray-100 text-lg px-8 py-3" asChild>
                    <Link href="/productos/tablas">Equipate Ahora</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 text-lg px-8 py-3 bg-transparent"
                    asChild
                  >
                    <Link href="/contacto">Contactanos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection animation="slideUp">
          <NewsletterSection />
        </AnimatedSection>

        {/* Community Section with Stagger */}
        <AnimatedSection animation="fadeIn">
          <section className="py-12 bg-muted">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <AnimatedSection animation="slideRight" delay={200}>
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Conecta con nuestra comunidad</h2>
                    <p className="text-lg mb-6">
                      Únete a la comunidad de bodyboarders más grande de Argentina. Comparte tus experiencias, aprende
                      nuevas técnicas y mantente al día con los últimos eventos. Somos una familia unida por la pasión
                      del bodyboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="https://instagram.com/bodyboardargentina" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-pink-600 hover:bg-pink-700">
                          <Instagram className="mr-2 h-5 w-5" />
                          Síguenos en Instagram
                        </Button>
                      </Link>
                      <Link
                        href="https://www.facebook.com/bodyboardargentinaa"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700">
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
                            className="mr-2 h-5 w-5"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                          Síguenos en Facebook
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>

                <StaggerContainer className="grid grid-cols-3 gap-3" staggerDelay={150}>
                  {/* Fila superior - 3 imágenes */}
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/community/bodyboard-group-hug.jpeg"
                      alt="Comunidad de bodyboarders unidos en el agua"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/community/rider-in-barrel.jpeg"
                      alt="Riders en acción"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/news/bodyboard-competition-beach.jpg"
                      alt="Competencia de bodyboard"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Fila inferior - 3 imágenes */}
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/products/bodyboard-kit-complete.jpeg"
                      alt="Equipos de calidad"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/landscapes/mar-del-plata-cliffs.jpg"
                      alt="Acantilados de Mar del Plata - Spot perfecto para bodyboard"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="/images/backgrounds/perfect-wave-tube.jpeg"
                      alt="Tubo perfecto para bodyboard"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </StaggerContainer>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>

      {/* Footer with Animation */}
      <AnimatedSection animation="fadeIn">
        <footer className="bg-gray-900 text-white py-12">
          <div className="container">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8" staggerDelay={100}>
              <div>
                <h3 className="text-lg font-bold mb-4">Bodyboard Argentina</h3>
                <p className="text-gray-400">Tu tienda especializada en productos de bodyboard de alta calidad.</p>
                <p className="text-gray-400 text-sm mt-2">Desde 2020 conectando riders.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Productos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/productos/tablas" className="text-gray-400 hover:text-white">
                      Tablas
                    </Link>
                  </li>
                  <li>
                    <Link href="/productos/patas-de-rana" className="text-gray-400 hover:text-white">
                      Patas de Rana
                    </Link>
                  </li>
                  <li>
                    <Link href="/productos/trajes" className="text-gray-400 hover:text-white">
                      Trajes de Neoprene
                    </Link>
                  </li>
                  <li>
                    <Link href="/productos/accesorios" className="text-gray-400 hover:text-white">
                      Accesorios
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Enlaces</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/sobre-nosotros" className="text-gray-400 hover:text-white">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="text-gray-400 hover:text-white">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/preguntas-frecuentes" className="text-gray-400 hover:text-white">
                      Preguntas Frecuentes
                    </Link>
                  </li>
                  <li>
                    <Link href="/politica-de-privacidad" className="text-gray-400 hover:text-white">
                      Política de Privacidad
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contacto</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: info@bodyboardargentina.com</li>
                  <li>Teléfono: +54 11 1234-5678</li>
                  <li>
                    <Link
                      href="https://instagram.com/bodyboardargentina"
                      className="flex items-center gap-2 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-5 w-5" />
                      @bodyboardargentina
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/bodyboardargentinaa"
                      className="flex items-center gap-2 hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                        className="text-blue-400"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      Bodyboard Argentina
                    </Link>
                  </li>
                </ul>
              </div>
            </StaggerContainer>
            <AnimatedSection animation="fadeIn" delay={800}>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Bodyboard Argentina. Todos los derechos reservados.</p>
              </div>
            </AnimatedSection>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  )
}

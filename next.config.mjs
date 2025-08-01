/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['blob.v0.dev'], // Para las imágenes de v0
  },
  // Configuración para deployment
  output: 'standalone',
  trailingSlash: false,
}

export default nextConfig

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "dist",
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed static `output: 'export'` to allow Next.js image optimization.
  // If you require static export, set images.unoptimized: true instead.
  images: {
    unoptimized: false,
    domains: ['calkilo.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.calkilo.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig

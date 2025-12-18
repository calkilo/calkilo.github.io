/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['calkilo.com'],
  },
  trailingSlash: true,
}

module.exports = nextConfig

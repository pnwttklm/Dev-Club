/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'promptpay.io'],
  },
future: {
    serverComponents: true, // Enable Server Actions
  },
experimental: {
    serverActions: true,
  },
 testEnvironment: "node", 
}

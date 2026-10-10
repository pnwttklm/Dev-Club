/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: { remotePatterns: [] },
  experimental: { optimizePackageImports: ['@chakra-ui/react'] },
};
// Focused browser runs must not share generated files with the user's dev server.
if (process.env.LANDING_MOTION_TEST) {
  nextConfig.distDir = '.next-motion';
  nextConfig.webpack = (config) => { config.cache = false; return config; };
}
module.exports = nextConfig;

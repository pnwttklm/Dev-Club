/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/storage1-15612.appspot.com/o/ICTBuilding.png',
        search: '?alt=media&token=a2e64f54-b92f-4c18-b45a-e743b1fa28f2',
      },
    ],
  },
};

module.exports = nextConfig;

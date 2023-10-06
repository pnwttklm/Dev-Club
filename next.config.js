/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
module.exports = {
    images: {
      domains: ['tools.applemediaservices.com','play.google.com','firebasestorage.googleapis.com','images.unsplash.com'],
    },
    // ...
    // Add a configuration object for the 'publicRuntimeConfig' property
    publicRuntimeConfig: {
      // You can provide additional configuration options here if needed
    },
  };

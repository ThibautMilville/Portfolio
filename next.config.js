/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@images'] = require('path').resolve(__dirname, 'public/images');
    config.resolve.alias['@public'] = require('path').resolve(__dirname, 'public');
    return config;
  },
};

module.exports = nextConfig;

const { i18n } = require('./next-i18next.config.js')


/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5500',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'nik19ta.pro',
        port: '443',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig

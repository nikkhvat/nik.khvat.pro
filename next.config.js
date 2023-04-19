// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },

}

module.exports = nextConfig

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config.js')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['localhost', 'nik19ta.pro'],
  },
  webpack: (config, { dev, buildId, isServer }) => {

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    
    if (!dev && !isServer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: `../analyze/client-${buildId}.html`,
        })
      );
    }

    if (!dev && isServer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: `../analyze/server-${buildId}.html`,
        })
      );
    }

    return config;
  },

}

module.exports = nextConfig

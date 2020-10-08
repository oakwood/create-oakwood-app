const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTranspileModules = require('next-transpile-modules')([
  'dom7/dist/dom7.modular',
  'swiper/js/swiper.esm',
])
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpackBaseConfig')

const nextConfig = {
  poweredByHeader: false,
  serverRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    GTM_ID: process.env.GTM_ID,
  },
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    GTM_ID: process.env.GTM_ID,
  },
  webpack: (config) => merge(config, webpackBaseConfig),
}

module.exports = withBundleAnalyzer(withTranspileModules(nextConfig))

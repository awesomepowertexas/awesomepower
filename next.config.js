/** @type {import('next').NextConfig} */
module.exports = {
  optimizeFonts: false,
  reactStrictMode: true,

  webpack(config) {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

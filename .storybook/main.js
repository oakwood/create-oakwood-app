const { merge } = require('webpack-merge')
const webpackBaseConfig = require('../webpackBaseConfig')

module.exports = {
  stories: ['../src/**/*stories.js'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  webpackFinal: async (config) =>
    merge(config, webpackBaseConfig, {
      resolve: {
        mainFiles: ['storybook.index', 'index'],
      },
    }),
}

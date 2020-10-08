const path = require('path')

module.exports = {
  resolve: {
    modules: [path.join(__dirname, './src'), 'node_modules'],
    alias: {
      test: path.join(__dirname, './test'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(svg|otf|eot|ttf|woff|woff2|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: `/_next/public`,
            outputPath: 'public',
          },
        },
      },
    ],
  },
}

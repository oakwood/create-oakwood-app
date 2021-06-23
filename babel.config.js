const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
]

module.exports = function config(api) {
  const isServer = api.caller((caller) => caller && caller.isServer)
  const isCallerDevelopment = api.caller((caller) => caller && caller.isDev)

  // console.log('*********', isServer, isCallerDevelopment)
  // console.log('api', api)
  // console.log('env', api.env(console.log))
  // console.log('caller', api.caller(console.log))

  return {
    presets: [
      [
        'next/babel',
        {
          // Target ES2015+ browsers
          'preset-env': {
            targets: 'Chrome >= 60, Safari >= 10.1, iOS >= 10.3, Firefox >= 54, Edge >= 15',
            useBuiltIns: false,
          },
          // Monkey patches React to notify you about avoidable re-renders.
          // Based on: https://github.com/vercel/next.js/tree/canary/examples/with-why-did-you-render
          'preset-react': {
            runtime: 'automatic',
            development: process.env.NODE_ENV === 'development',
            importSource:
              !isServer && isCallerDevelopment ? '@welldone-software/why-did-you-render' : 'react',
          },
        },
      ],
    ],
    plugins: [
      'babel-plugin-optimize-clsx',
      'babel-plugin-lodash',
      [
        'babel-plugin-i18n-tag-translate',
        {
          groupDir: './src',
        },
      ],
      [
        'babel-plugin-transform-imports',
        {
          '@material-ui/core': {
            // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
            // eslint-disable-next-line no-template-curly-in-string
            transform: '@material-ui/core/esm/${member}',
            preventFullImport: true,
          },
        },
      ],
    ],
    env: {
      development: {},
      production: {
        plugins: productionPlugins,
      },
    },
  }
}

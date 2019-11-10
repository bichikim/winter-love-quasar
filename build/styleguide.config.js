require('./ts-register')
const {default: addBaseWebpack} = require('./add-base-webpack.ts')
const webpackConfig = {
  mode: 'development',
  // devtool: 'inline-source-map',
}

const path = require('path')

/**
 * Generate webpack config
 */
addBaseWebpack(webpackConfig, {
  additionalAlias: true,
  eslint: true,
  fileLoader: true,
  middlewarePath: '../test/mock/middleware',
  stylus: true,
  transpileOnly: true,
  vue: true,
})

const root = process.cwd()

/**
 * Vue Styleguidist config
 * @link https://github.com/vue-styleguidist/vue-styleguidist
 */
module.exports = {
  webpackConfig,
  components: path.join(root, '/src/components/**/*.vue'),
  require: [
    path.join(root, 'quasar.require.ts'),
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/ionicons@^4.0.0/dist/css/ionicons.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/animate.css@^3.5.2/animate.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/quasar@^1.0.3/dist/quasar.min.css',
          type: 'text/css',
        },
      ],
    },
  },
}

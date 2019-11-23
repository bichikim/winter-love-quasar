const {join} = require('path')
const quasarChainConfig = require('./webpack.quasar')
const webpackConfig = quasarChainConfig().toConfig()

const root = process.cwd()

/**
 * Vue Styleguidist config
 * @link https://github.com/vue-styleguidist/vue-styleguidist
 */
module.exports = {
  webpackConfig,
  components: join(root, '/src/components/**/*.vue'),
  styleguideDir: '../.docs/styleguide',
  pagePerSection: true,
  renderRootJsx: join(root, '/test/styleguide.root.ts'),
  require: [
    join(root, 'test/styleguide.require.ts'),
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

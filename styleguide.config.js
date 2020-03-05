const {join} = require('path')
const quasarChainConfig = require('./build/webpack.quasar')
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
  /**
   * each component rendering
   */
  renderRootJsx: join(root, 'test/styleguide.root.ts'),
  /**
   * before render import any
   */
  require: [
    join(root, 'test/styleguide.require.ts'),
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' +
            '|Material+Icons|Material+Icons+Round',
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdn.jsdelivr.net/npm/ionicons@^4.0.0/dist/css/ionicons.min.css',
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdn.jsdelivr.net/npm/animate.css@^3.5.2/animate.min.css',
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdn.jsdelivr.net/npm/quasar@^1.0.3/dist/quasar.min.css',
        },
      ],
    },
  },
}

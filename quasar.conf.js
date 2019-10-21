/* eslint-disable no-void */
require('./build/ts-register')
const env = require('./build/env/index.ts').default()
const {default: addBaseWebpack, envJsonStringify} = require('./build/add-base-webpack.ts')
const quasarEnv = envJsonStringify(env)
const netlifyRedirects = {
  from: 'redirects',
  to: './_redirects',
  flatten: true,
  toType: 'file',
}

module.exports = () => ({
  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  boot: [
    'i18n',
    'axios',
    'middleware',
    'firebase',
  ],

  // main css (importing globally)
  css: [
    'app.styl',
  ],

  // extras
  extras: [
    'roboto-font',
    'material-icons', // optional, you are not bound to it
    'ionicons-v4', // optional, you are not bound to it
    // 'mdi-v3',
    // 'fontawesome-v5',
    // 'eva-icons'
  ],

  framework: {
    all: true,

    // Quasar directives
    directives: [
      'ClosePopup',
      'Ripple',
      'Scroll',
      'ScrollFire',
      'TouchHold',
      'TouchPan',
      'TouchRepeat',
      'TouchSwipe',
    ],

    // Quasar plugins
    plugins: [
      'AddressbarColor',
      'AppFullscreen',
      'Loading',
      'LoadingBar',
      'Meta',
      'Notify',
    ],

    config: {

      // Quasar loading bar place on a page top head
      loadingBar: {
        color: 'grey',
      },
    },

    iconSet: 'ionicons-v4',
    // lang: 'de' // Quasar language
  },

  supportIE: true,

  sourceFiles: {
    indexHtmlTemplate: 'src/index.pug',
    router: 'src/router/index.ts',
  },

  build: {
    productName: env.PRODUCT_NAME,
    env: quasarEnv,
    scopeHoisting: true,
    vueRouterMode: env.VUE_ROUTER_MODE,
    // vueCompiler: true,
    gzip: true,
    analyze: process.env.ANALYZE === 'true',
    // extractCSS: false,
    extendWebpack(config) {
      addBaseWebpack(config, {
        tsconfigPath: env.WEBPACK_TSCONFIG,
        srcAlias: env.WEBPACK_SRC_ALIAS,
        eslint: true,
        eslintCache: process.env.NODE_ENV !== 'production',
        transpileOnly: process.env.NODE_ENV !== 'production',
        tslintPath: process.env.NODE_ENV !== 'production' ? void 0: env.WEBPACK_TSLINT,
        copyFiles: process.env.NETLIFY === 'true' ? [netlifyRedirects] : void 0,
        middlewarePath: env.VUE_MIDDLEWARE_PATH,
        pagePath: env.VUE_PAGES_PATH,
        stylus: false,
        vue: false,
      })
    },
  },

  devServer: {
    // https: true,
    // port: 8080,
    open: true, // opens browser window automatically
  },

  animations: 'all', // --- includes all animations
  // animations: [],

  ssr: {
    pwa: false,
  },

  pwa: {
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {},
    manifest: {
      // name: 'Quasar App',
      // short_name: 'Quasar-PWA',
      // description: 'Best PWA App in town!',
      display: 'standalone',
      orientation: 'portrait',
      'background_color': '#ffffff',
      'theme_color': '#027be3',
      icons: [
        {
          'src': 'statics/icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png',
        },
        {
          'src': 'statics/icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png',
        },
        {
          'src': 'statics/icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png',
        },
        {
          'src': 'statics/icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png',
        },
        {
          'src': 'statics/icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png',
        },
      ],
    },
  },

  electron: {
    // bundler: 'builder', // or 'packager'

    // extendWebpack(cfg) {
    // do something with Electron main process Webpack cfg
    // chainWebpack also available besides this extendWebpack
    // },

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',

      // Window only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      // appId: 'quasar-app'
    },
  },
})

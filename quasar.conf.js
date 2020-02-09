const {tsConfig, pugConfig, aliasConfig, iconFont} = require('./build/webpack.chain.js')
const envFunc = require('./build/env.js')
const envReader = require('./build/env-reader.js')


module.exports = (ctx) => {

  const {mode} = ctx

  const env = envFunc(mode)

  return  {
  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  boot: [
    'i18n',
    ['firebase', {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_API_ID,
    }],
    'jquery',
  ],

  // main css (importing globally)
  css: [
    'app.styl',
  ],

  // extras
  extras: [
    'roboto-font',
    // 'themify',
    // 'material-icons', // optional, you are not bound to it
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
    productName: 'winter-love',
    scopeHoisting: true,
    vueRouterMode: 'history',
    gzip: true,
    env: envReader(env),
    analyze: false,
    // extractCSS: false,
    chainWebpack(chain) {
      aliasConfig(chain)
      tsConfig(chain, ctx)
      pugConfig(chain)
      iconFont(chain)
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
}}


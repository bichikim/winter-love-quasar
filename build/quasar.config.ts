import {QuasarConfig, QuasarConfigContext} from 'quasar'
import AddBaseWebpack, {envJsonStringify} from './add-base-webpack'
import _env from './env'
const env = _env()

export default (context: QuasarConfigContext): QuasarConfig => {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'middleware',
      'class-component',
      'vue-meta',
      'firebase',
    ],

    css: [
      'app.styl',
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      'ionicons-v4', // optional, you are not bound to it
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      all: context.dev, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QScrollArea',
        'QExpansionItem',
        'QImg',
        'QAvatar',
      ],

      directives: [
        'Ripple',
      ],

      // Quasar plugins
      plugins: [
        'Notify',
      ],

      iconSet: 'ionicons-v4',
      // lang: 'de' // Quasar language
    },

    supportIE: true,

    sourceFiles: {
      indexHtmlTemplate: 'src/index.pug',
      router: 'src/router.ts',
    },

    build: {
      env: envJsonStringify(env),
      scopeHoisting: true,
      vueRouterMode: env.VUE_ROUTER_MODE,
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(config) {
        AddBaseWebpack(config, {
          tsconfigPath: env.WEBPACK_TSCONFIG,
          aliasSrc: env.WEBPACK_SRC_ALIAS,
          eslint: true,
          transpileOnly: true,
          tslintPath: env.WEBPACK_TSLINT,
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

    // animations: 'all' --- includes all animations
    animations: [],

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

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

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
  }
}

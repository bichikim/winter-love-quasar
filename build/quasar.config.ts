import dotenv from 'dotenv'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import VueAutoRoutingPlugin from 'vue-auto-routing/lib/webpack-plugin'
import {Configuration} from 'webpack'
const env: NodeJS.ProcessEnv = {
  VUE_PAGES_PATH: 'pages',
  VUE_MIDDLEWARE_PATH: 'middleware',
  VUE_LAYOUT_PATH: 'layouts',
  WEBPACK_SRC_ALIAS: '@',
  WEBPACK_TSCONFIG: 'tsconfig.json',
  VUE_ROUTER_MODE: 'history',
  ...dotenv.config() as any,
}

interface Context {
  dev: boolean
  prod: boolean
  mode: {spa: boolean}
  modeName: 'spa' | string
  target: {}
  targetName?: string
  emulator?: string
  arch: {}
  archName?: string
  bundler: {}
  bundlerName?: string
  debug: boolean
}

interface QuasarConfig {
  boot?: string[]
  css?: string[]
  extras?: string[]
  framework?: {
    all?: boolean
    components?: Array< string
      | 'QLayout' | 'QHeader' | 'QDrawer' | 'QPageContainer' | 'QPage' | 'QToolbar'
      | 'QToolbarTitle' | 'QBtn' | 'QIcon' | 'QList' | 'QItem' | 'QItemSection' | 'QItemLabel'
      | 'QScrollArea'
      | 'QExpansionItem' | 'QImg' | 'QAvatar'
      >
    directives?: string[]
    plugins?: string[]
    iconSet?: string | 'ionicons-v4' | 'material-icons',
  }
  supportIE?: boolean
  sourceFiles?: {
    indexHtmlTemplate?: string,
  }
  build?: {
    env?: {
      [key: string]: string,
    },
    scopeHoisting?: boolean
    vueRouterMode?: 'history' | 'hash' | 'abstract'
    gzip?: boolean
    extendWebpack?: (config: Configuration) => void,
  }
  devServer?: {
    open?: boolean,
  }
  animations?: any[]
  ssr?: {
    pwa?: boolean,
  }
  pwa?: {
    manifest?: {
      display?: 'standalone' | string
      orientation?: 'portrait' | string
      'background_color'?: string
      'theme_color'?: string
      icons?: Array<{
        src: string
        sizes: string
        type: string,
      }>,
    },
  }

  cordova?: {
    id?: string,
  }
  electron?: {
    bundler?: 'builder' | 'packager'
    extendWebpack?: (config: Configuration) => void
    /**
     * @link https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
     */
    packager?: {
      appBundleId?: string
      appCategoryType?: string
      osxSign?: string
      // protocol: 'myapp://path',
      protocol?: string,
    }
    /**
     *  https://www.electron.build/configuration/configuration
     */
    builder?: {
      appId?: string,
    },
  }
}

export default (context: Context): QuasarConfig => {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'middleware',
      'class-component',
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
    },

    build: {
      env: {
        VUE_LAYOUTS_PATH: JSON.stringify(env.VUE_LAYOUT_PATH),
        VUE_PAGES_PATH: JSON.stringify(env.VUE_PAGES_PATH),
        WEBPACK_SRC_ALIAS: JSON.stringify(env.WEBPACK_SRC_ALIAS),
        VUE_MIDDLEWARE_PATH: JSON.stringify(env.VUE_MIDDLEWARE_PATH),
      },
      scopeHoisting: true,
      vueRouterMode: env.VUE_ROUTER_MODE,
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(config) {
        if(!config.module){
          config.module = {rules: []}
        }
        if(!config.resolve){
          config.resolve = {}
        }
        if(!config.resolve.alias){
          config.resolve.alias = {}
        }
        if(!config.plugins){
          config.plugins = []
        }
        // eslint
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })
        // typescript
        config.resolve.plugins = [new TsconfigPathsWebpackPlugin({
          configFile: env.WEBPACK_TSCONFIG,
        })]
        if(!config.resolve.extensions){config.resolve.extensions = []}
        config.resolve.alias[env.WEBPACK_SRC_ALIAS] = resolve('src')
        config.resolve.extensions.push('.ts', '.tsx')
        config.module.rules.push( {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true,
                configFile: env.WEBPACK_TSCONFIG,
              },
            },
          ],
        })
        config.plugins.push(new ForkTsCheckerWebpackPlugin({
          tsconfig: env.WEBPACK_TSCONFIG,
          vue: true,
        }))
        // pug
        config.module.rules.push({
          test: /\.pug$/,
          oneOf: [
            // this applies to `<template lang="pug">` in Vue components
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader'],
            },
            // this applies to pug imports inside JavaScript
            {
              use: ['pug-loader'],
            },
          ],
        })
        // vue auto routing
        config.plugins.push(
          new VueAutoRoutingPlugin({
            pages: resolve('src', env.VUE_PAGES_PATH),
            importPrefix: `${env.WEBPACK_SRC_ALIAS}/${env.VUE_PAGES_PATH}/`,
          }),
        )
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

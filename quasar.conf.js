const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')
const {resolve} = require('path')
// Configuration for your app
const srcAlias = '@'
const layoutPath = 'layouts'
const pagesPath = 'pages'
const middlewarePath = 'middleware'
const configFile = 'tsconfig.json'

module.exports = function(context) {
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
      'ionicons-v4',// optional, you are not bound to it
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

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
        VUE_LAYOUTS_PATH: JSON.stringify(layoutPath),
        VUE_PAGES_PATH: JSON.stringify(pagesPath),
        WEBPACK_SRC_ALIAS: JSON.stringify(srcAlias),
        VUE_MIDDLEWARE_PATH: JSON.stringify(middlewarePath),
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(config) {
        // eslint
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        })
        // typescript
        config.resolve.plugins = [new TsconfigPathsWebpackPlugin({
          configFile,
        })]
        if(!config.resolve.extensions){config.resolve.extensions = []}
        config.resolve.alias[srcAlias] = resolve('src')
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
                configFile,
              },
            },
          ],
        })
        config.plugins.push(new ForkTsCheckerWebpackPlugin({
          tsconfig: configFile,
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
            pages: resolve('src', pagesPath),
            importPrefix: `${srcAlias}/${pagesPath}/`,
          })
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

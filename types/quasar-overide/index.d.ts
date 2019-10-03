import {QSsrContext} from 'quasar'

declare module 'quasar' {
  import {QuasarPluginOptions, QSsrContext} from 'quasar/dist/types'
  import 'quasar/dist/types/vue'
  import Vue, {ComponentOptions, PluginObject, VueConstructor} from 'vue'
  import VueRouter from 'vue-router'
  import {Store} from 'vuex'
  import {Configuration} from 'webpack'

  export * from 'quasar/dist/types/index'
  export * from 'quasar/dist/types/utils'

  // export interface AnimateContext {
  //   name: string
  //   duration: number
  //   to: number
  //   from: number
  //   apply: (newProgress: number, progress: number) => any
  //   done: (progress: number) => any
  //   cancel: any
  //   easing: any
  // }

  export type BootFunction = (context: Context) => any

  export interface Context<V extends Vue = Vue, S = any> {
    Vue: VueConstructor<V>,
    app: ComponentOptions<V>
    router: VueRouter
    ssrContext: null | QSsrContext
    store: Store<S>
  }

  // export interface QuasarConfigContext {
  //   dev: boolean
  //   prod: boolean
  //   mode: { spa: boolean }
  //   modeName: 'spa' | string
  //   target: {}
  //   targetName?: string
  //   emulator?: string
  //   arch: {}
  //   archName?: string
  //   bundler: {}
  //   bundlerName?: string
  //   debug: boolean
  // }

  export interface QuasarConfig {
    boot?: string[]
    css?: string[]
    extras?: string[]
    framework?: {
      all?: boolean
      components?: Array<keyof QuasarPluginOptions.components>
      directives?: string[]
      plugins?: string[]
      iconSet?: string | 'ionicons-v4' | 'material-icons'
      config: {
        loadingBar: {
          color: string,
        },
        [key: string]: any
      }
    }
    supportIE?: boolean
    sourceFiles?: {
      rootComponent?: string,
      router?: string,
      store?: string,
      indexHtmlTemplate?: string,
      registerServiceWorker?: string,
      serviceWorker?: string,
      electronMainDev?: string,
      electronMainProd?: string,
    }
    build?: {
      productName?: string
      env?: {
        [key: string]: string,
      },
      analyze?: boolean | object
      scopeHoisting?: boolean
      vueRouterMode?: 'history' | 'hash' | 'abstract'
      gzip?: boolean
      extendWebpack?: (config: Configuration) => void,
    }
    devServer?: {
      open?: boolean,
    }
    animations?: any[] | 'all'
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
       * @link https://github.com/electron-userland/
       * electron-packager/blob/master/docs/api.md#options
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

  export type IconSet = (lang: any) => any

  export type GetLocale = () => any

  export interface Lang {

  }

  interface Quasar<T = any> extends PluginObject<T>, QuasarPluginOptions {
    version: string
    lang: Lang
    getLocale: GetLocale
    iconSet: IconSet
    ssrUpdate: (ctx: any) => any
  }

  const quasarObject: Quasar

  export default quasarObject
}

/**
 * Fix vue $q
 */
export interface QVueGlobals {
  theme: 'mat' | 'ios'
}

declare module 'vue/types/vue' {
  interface Vue {
    __qClosePopup: (event?: Event) => void
  }
}

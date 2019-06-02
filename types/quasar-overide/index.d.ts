/* tslint:disable:ordered-imports */
declare module 'quasar' {
  import {AxiosInstance} from 'axios'
  import {LocalForage} from 'localforage'
  import Vue, {VueConstructor, ComponentOptions, PluginFunction, PluginObject} from 'vue'
  import VueI18n from 'vue-i18n'
  import VueRouter from 'vue-router'
  import {Store} from 'vuex'
  import {AxiosInstance} from 'axios'
  import {Configuration} from 'webpack'
  import {app} from 'firebase'
  export * from 'quasar/dist/types'

  export interface AnimateContext {
    name: string
    duration: number
    to: number
    from: number
    apply: (newProgress: number, progress: number) => any
    done: (progress: number) => any
    cancel: any
    easing: any
  }

  export interface StoreContext<V extends Vue = Vue> {
    Vue: VueConstructor<V>
    axios: () => AxiosInstance
    firebase: () => app.App
  }

  export interface Context<V extends Vue = Vue> extends StoreContext<V>{
    app: ComponentOptions<V>
    router: VueRouter
    ssrContext: null | any
    store: Store
  }

  export interface QuasarConfigContext {
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

  export interface QuasarConfig {
    boot?: string[]
    css?: string[]
    extras?: string[]
    framework?: {
      all?: boolean
      components?: Array< string
        | 'QLayout' | 'QHeader' | 'QDrawer' | 'QPageContainer' | 'QPage' | 'QToolbar'
        | 'QToolbarTitle' | 'QBtn' | 'QIcon' | 'QList' | 'QItem' | 'QItemSection'
        | 'QItemLabel' | 'QScrollArea' | 'QExpansionItem' | 'QImg' | 'QAvatar'
        >
      directives?: string[]
      plugins?: string[]
      iconSet?: string | 'ionicons-v4' | 'material-icons',
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

  export interface Lang {

  }

  export type IconSet = (lang: any) => any

  export type GetLocale = () => any

  interface Quasar extends PluginObject<any>{
    version: string
    install: PluginFunction<any>
    lang: Lang
    getLocale: GetLocale
    iconSet: IconSet
    ssrUpdate: (ctx: any) => any
  }

  const quasarObject: Quasar

  export default quasarObject
}

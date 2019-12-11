/**
 * override quasar types
 */
declare module 'quasar/dist/types/index' {
  import {BootFileParams, QuasarPluginOptions} from 'quasar'
  import 'quasar/dist/types/vue'
  import {PluginObject} from 'vue'
  import {Configuration} from 'webpack'

  export type BootFileFunction = (context: BootFileParams) => Promise<any> | any

  export interface QuasarConfig {
    boot?: string[]
    css?: string[]
    extras?: string[]
    framework?: {
      all?: boolean
      components?: Array<keyof QuasarPluginOptions.components>
        | typeof QuasarPluginOptions.prototype.components
      directives?: string[]
      plugins?: string[]
      iconSet?: string | 'ionicons-v4' | 'material-icons'
      config: {
        loadingBar: {
          color: string,
        },
        [key: string]: any,
      },
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
      https?: boolean | { key: any, cert: any, ca: any },
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

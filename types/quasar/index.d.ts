import {QVueGlobals} from 'quasar/dist/types/globals'
import {GetLocale, IconSet} from 'quasar/dist/types/index'
import chain from 'webpack-chain'
import {Configuration} from 'webpack'


/**
 * override quasar types
 */
declare module 'quasar/dist/types/index' {
  import {Quasar, QuasarPluginOptions} from 'quasar'
  import 'quasar/dist/types/vue'
  import {Configuration} from 'webpack'

  export interface BuildConfig {
    transpileDependencies?: RegExp[]
    transformAssetUrls?: Record<string, any>
    showProgress?: boolean
    extendWebpack?: (config: Configuration) => void
    chainWebpack?: (chain: chain.Config) => void
    productName?: string
    env?: Record<string, string>
    analyze?: boolean | object
    scopeHoisting?: boolean
    vueRouterMode?: 'history' | 'hash' | 'abstract'
    gzip?: boolean
    extendWebpack?: (config: Configuration) => void
  }

  export interface SourceFilesConfig {
    rootComponent?: string
    router?: string
    store?: string
    indexHtmlTemplate?: string
    registerServiceWorker?: string
    serviceWorker?: string
    electronMainDev?: string
    electronMainProd?: string
  }

  export interface FrameworkConfig {
    all?: boolean
    components?: Array<keyof QuasarPluginOptions.components>
      | typeof QuasarPluginOptions.prototype.components
    directives?: string[]
    plugins?: string[]
    iconSet?: string | 'ionicons-v4' | 'material-icons'
    config?: {
      loadingBar: {
        color: string,
      },
      [key: string]: any
    }
  }

  export interface PwaManifestConfig {
    display?: 'standalone' | string
    orientation?: 'portrait' | string
    'background_color'?: string
    'theme_color'?: string
    icons?: Array<{
      src: string
      sizes: string
      type: string
    }>
  }

  export interface ElectronConfig {
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

  export interface SsrConfig {
    pwa?: boolean
  }

  export interface PwaConfig {
    manifest?: PwaManifestConfig
  }

  export interface QuasarConfig {
    boot?: string[]
    css?: string[]
    extras?: string[]
    framework?: FrameworkConfig
    supportIE?: boolean
    sourceFiles?: SourceFilesConfig
    build?: BuildConfig
    devServer?: {
      open?: boolean,
      https?: boolean | { key: any, cert: any, ca: any },
    }
    animations?: any[] | 'all'
    ssr?: SsrConfig
    pwa?: PwaConfig
    cordova?: {
      id?: string,
    }
    electron?: ElectronConfig
  }

  export interface QuasarPluginOptions {
    config: QuasarConfig
  }

  export type IconSet = (lang: any) => any

  export type GetLocale = () => any

  export default Quasar
}

declare module 'quasar/dist/types/plugin' {

  export interface Lang {

  }

  export interface PluginObject<T> {
    version: string
    lang: Lang
    getLocale: GetLocale
    iconSet: IconSet
    ssrUpdate: (ctx: any) => any
  }
}


declare module 'quasar/dist/types/globals' {
  export interface QVueGlobals {
    theme: 'mat' | 'ios'
    iconMapFn: (iconName: string) => void | any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    __qClosePopup: (event?: Event) => void
  }
}

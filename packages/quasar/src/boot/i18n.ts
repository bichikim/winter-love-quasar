import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import {BootFileFunction} from 'src/types'
import axios from 'axios'
import Vue from 'vue'

export type LocaleFunction = (locale: SupportLocale) => Promise<void>

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * change i18n locale, quasar lang, html lang & axios Accept-Language (if vue has $axios)
     */
    $locale: LocaleFunction
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    locale?: LocaleFunction
  }
}

export interface QuasarMessages {
  'en-us': () => Promise<any>
  'ko-kr': () => Promise<any>
}

export type SupportLocale = keyof QuasarMessages

export type MaybeEsModule = any | {default: any; [key: string]: any}

const resolveEsModule = (module: MaybeEsModule): any => {
  return module.default ?? module
}

const findVuePluginInstance = (vue: Vue, name: string) => {
  if(vue.$root) {
    return vue.$root.$options[name]
  }
  return vue.$options[name]
}

const boot: BootFileFunction = ({Vue, app}) => {
  Vue.use(VueI18n)

  // local is single Singleton
  Vue.mixin({
    created(this: Vue) {
      this.$locale = findVuePluginInstance(this, 'locale')
    },
  })

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages,
  })

  // It tells Webpack quasar which quasar/lang Webpack need
  const quasarMessages: QuasarMessages = {
    'en-us': () => import('quasar/lang/en-us'),
    'ko-kr': () => import('quasar/lang/ko-kr'),
  }

  // add new $locale
  app.locale = async function (this: Vue, locale: SupportLocale) {
    if(!this || !this.$i18n) {
      throw new Error('$locale: please use $locale function in a Vue instance')
    }

    this.$i18n.locale = locale

    axios.defaults.headers.common['Accept-Language'] = locale

    if(!document) {
      throw new Error('$locale: please do not call $locale in server side')
    }

    // change html<lang="">
    // eslint-disable-next-line no-unused-expressions
    document.querySelector('html')?.setAttribute('lang', String(locale))

    this.$q.lang.set(await resolveEsModule(quasarMessages[locale]))
  }
}

export default boot

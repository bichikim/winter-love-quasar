import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import {BootFileFunction} from 'src/types'
import axios from 'axios'

export type LocaleFunction = (locale: SupportLocale) => Promise<void>

declare module 'vue/types/vue' {
  interface Vue {
    $locale: LocaleFunction
  }
}

export interface QuasarMessages {
  'en-us': () => Promise<any>
  'ko-kr': () => Promise<any>
}

export type SupportLocale = keyof QuasarMessages

export type MaybeEsModule = any | {default: any, [key: string]: any}

const resolveEsModule = (module: MaybeEsModule): any => {
  return module.default ?? module
}

const boot: BootFileFunction = ({Vue, app}) => {

  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages,
  })

  // It tells Webpack quasar which quasar/lang Webpack need
  const quasarMessages: QuasarMessages = {
    'en-us': () => (import('quasar/lang/en-us')),
    'ko-kr': () => (import('quasar/lang/ko-kr')),
  }

  Vue.prototype.$locale = async function (locale: SupportLocale) {
    if(!this || !this.$i18n) {
      throw new Error('$locale: please use $locale function in a Vue instance')
    }

    this.$i18n.locale = locale

    if(this.$axios) {
      axios.defaults.headers.common['Accept-Language'] = locale
    }

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


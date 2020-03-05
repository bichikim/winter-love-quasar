import {QuasarPluginOptions} from 'quasar'
import * as Sinai from 'sinai'
import {BootFileParams} from 'src/types'
import createQuasar from 'test/src/create-quasar'
import Vue from 'vue'
import VueI18n, {I18nOptions} from 'vue-i18n'
import VueRouter, {RouterOptions} from 'vue-router'

export interface AppOptions {
  store?: (vue: typeof Vue) => typeof Vue.prototype.$store
  quasar?: QuasarPluginOptions
  router?: RouterOptions
  i18n?: I18nOptions,
}

export interface BootParams extends Omit<BootFileParams<typeof Vue.prototype.$store>, 'app'> {
  app: Record<string, any>
}

export const createBootParams = (
  vue: typeof Vue.prototype.$store,
  options: AppOptions = {},
  ssrContext = null,
): BootParams => {
  let store, router

  createQuasar(vue, options.quasar)

  // must exist  **********************

  vue.use(Sinai)

  if(options.store) {
    store = options.store(vue)
  } else {
    store = Sinai.store(Sinai.module(), {
      strict: false,
    })
  }

  vue.use(VueRouter)

  if(options.router) {
    router = new VueRouter({
      ...options.router,
      mode: 'abstract',
    })
  } else {
    router = new VueRouter({
      mode: 'abstract',
    })
  }

  const app: Record<string, any> = {
    store, router,
  }

  // optional  *************************

  if(options.i18n) {
    Vue.use(VueI18n)
    app.i18n = new VueI18n(options.i18n)
  }


  return {
    Vue: vue,
    app,
    ssrContext,
    router,
    store,
  }
}

export default createBootParams

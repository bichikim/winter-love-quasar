import firebase from '@/boot/firebase'
import i18n from '@/boot/i18n'
import routerFunction from '@/router'
import storeFunction from '@/store'
import {BootFileParams} from 'quasar'
import Vue from 'vue'

process.env.VUE_ROUTER_MODE = 'abstract'

const store = storeFunction({Vue})
const router = routerFunction({Vue})

export default (vue: typeof Vue = Vue) => {
  const app: any = {
    store,
    router,
  }
  const context: BootFileParams = {
    Vue: vue,
    app,
    ssrContext: null,
    router,
    store,
  }

  firebase(context)
  i18n(context)
  return {
    app,
    context,
  }
}

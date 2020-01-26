import routerFunction from '@/router'
import storeFunction from '@/store'
import {BootFileFunction} from 'quasar'
import {createBootParams, BootParams} from './create-test'
import Vue from 'vue'

process.env.VUE_ROUTER_MODE = 'abstract'

const store = storeFunction({Vue})
const router = routerFunction({Vue})

export default (boots: BootFileFunction[], vue: typeof Vue = Vue) => {
  const app: any = {
    store,
    router,
  }

  // todo WIP
  const context: BootParams = createBootParams(vue)

  boots.forEach((boot) => {
    boot(context)
  })

  return {
    app,
    context,
  }
}

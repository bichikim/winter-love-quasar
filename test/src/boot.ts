import {BootFileFunction} from 'src/types'
import {createBootParams, BootParams} from './create-test'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'

process.env.VUE_ROUTER_MODE = 'abstract'

const boot = (boots: BootFileFunction[], vue: typeof Vue = Vue): Promise<any> => {

  const context: BootParams = createBootParams(vue, {
    store: (Vue) => (store({Vue})),
    router: router({}),
  })

  const wait = boots.reduce((wait, boot) => {
    wait.push(boot(context))
    return wait
  }, [] as any[])

  return Promise.all(wait)
}

export default boot

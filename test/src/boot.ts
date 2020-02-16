import {BootFileFunction} from '@/types'
import {createBootParams, BootParams} from './create-test'
import Vue from 'vue'

process.env.VUE_ROUTER_MODE = 'abstract'

export default (boots: BootFileFunction[], vue: typeof Vue = Vue) => {

  // todo WIP
  const context: BootParams = createBootParams(vue)

  boots.forEach((boot) => {
    boot(context)
  })

  return context
}

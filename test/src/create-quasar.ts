/**
 * Add quasar into Vue
 */

import Quasar, {
  QuasarPluginOptions,
} from 'quasar'
import _Vue from 'vue'

interface Options {
  Vue: typeof _Vue
}

_Vue.use(Quasar as any, {})

function createQuasar(Vue: typeof _Vue, options: Partial<QuasarPluginOptions> = {}) {
  return Quasar
}

export default createQuasar

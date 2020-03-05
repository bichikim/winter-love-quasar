/**
 * Add quasar into Vue
 */

import Quasar, {
  AddressbarColor,
  AppFullscreen,
  ClosePopup,
  Loading,
  LoadingBar,
  Meta,
  Notify,
  Ripple,
  Scroll,
  ScrollFire,
  TouchHold,
  TouchPan,
  TouchRepeat,
  TouchSwipe,
  QuasarPluginOptions,
} from 'quasar'
import enUs from 'quasar/lang/en-us'
import ioniconsV4 from 'quasar/icon-set/ionicons-V4'
import _Vue from 'vue'

interface Options {
  Vue: typeof _Vue
}

_Vue.use(Quasar as any, {})

function createQuasar(Vue: typeof _Vue, options: Partial<QuasarPluginOptions> = {}) {

  // Vue.use(Quasar as any, {
  //   all: true,
  //   plugins: [
  //     AddressbarColor,
  //     AppFullscreen,
  //     Loading,
  //     LoadingBar,
  //     Meta,
  //     Notify,
  //   ],
  //   directives: [
  //     Ripple,
  //     ClosePopup,
  //     Scroll,
  //     ScrollFire,
  //     TouchSwipe,
  //     TouchRepeat,
  //     TouchPan,
  //     TouchHold,
  //   ],
  //   animations: 'all',
  //   iconSet: ioniconsV4,
  //   ...options,
  // })
  //
  // Vue.prototype.$q = _Vue.prototype.$q
  return Quasar
}

export default createQuasar

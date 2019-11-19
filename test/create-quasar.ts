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

_Vue.use(Quasar as any, {
  lang: enUs,
})

function createQuasar(Vue: typeof _Vue, options: Partial<QuasarPluginOptions> = {}) {
  Vue.use(Quasar as any, {
    all: true,
    config: {
      boot: [
        (context) => {
          console.log('boo?', context)
        },
      ],
    },
    plugins: [
      AddressbarColor,
      AppFullscreen,
      Loading,
      LoadingBar,
      Meta,
      Notify,
    ],
    directives: [
      Ripple,
      ClosePopup,
      Scroll,
      ScrollFire,
      TouchSwipe,
      TouchRepeat,
      TouchPan,
      TouchHold,
    ],
    animations: 'all',
    iconSet: ioniconsV4,
    ...options,
  })

  // quasar create only one $q
  Vue.prototype.$q = _Vue.prototype.$q
  return Quasar
}

export default createQuasar

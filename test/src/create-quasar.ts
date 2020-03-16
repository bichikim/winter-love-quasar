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
import iconSet from 'quasar/icon-set/material-icons'
import _Vue from 'vue'

interface Options {
  Vue: typeof _Vue
}

_Vue.use(Quasar as any, {})

/**
 * init Quasar for unit test
 * @param Vue
 * @param options
 */
function createQuasar(Vue: typeof _Vue, options: Partial<QuasarPluginOptions> = {}) {

  Vue.use(Quasar as any, {
    all: true,
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
    lang: enUs,
    animations: 'all',
    iconSet,
    ...options,
  })

  Vue.prototype.$q = _Vue.prototype.$q
  return Quasar
}

export default createQuasar

/**
 * Add quasar into Vue
 */

import quasar, {
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
} from 'quasar'
import ioniconsV4 from 'quasar/icon-set/ionicons-V4'
import Vue from 'vue'

Vue.use(quasar as any, {
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
  animations: 'all',
  iconSet: ioniconsV4,
})

export * from 'quasar'
export default quasar

import {BootFileFunction} from 'quasar'
import $ from 'jquery'

declare module 'vue/types/vue' {
  interface Vue {
    $jQuery: JQueryStatic
  }
}

const jQuery: BootFileFunction = ({Vue}) => {
  Vue.prototype.$jQuery = $
}

export default jQuery

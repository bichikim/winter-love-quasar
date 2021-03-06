import Axios, {AxiosInstance} from 'axios'
import {BootFileFunction} from 'src/types'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $axios: AxiosInstance
  }
}

const boot: BootFileFunction = ({Vue}) => {
  if(Vue.prototype.$axios) {
    return
  }
  Vue.prototype['$axios'] = Axios
}

export default boot

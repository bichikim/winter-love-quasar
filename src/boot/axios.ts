import Axios, {AxiosInstance} from 'axios'
import {BootFileFunction} from 'src/types'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}

const boot: BootFileFunction = ({Vue}) => {
  Vue.prototype.$axios = Axios
}

export default boot

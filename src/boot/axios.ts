import axios from 'axios'
import {Context} from 'quasar'

export default ({Vue}: Context) => {
  Vue.prototype.$axios = axios
}

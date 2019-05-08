import axios from 'axios'

export default ({Vue}: any) => {
  Vue.prototype.$axios = axios
}

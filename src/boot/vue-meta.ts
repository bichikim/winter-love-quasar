import {BootFileFunction} from 'quasar'
import VueMeta from 'vue-meta'

const vueMeta: BootFileFunction = ({Vue}) => {
  Vue.use(VueMeta)
}

export default vueMeta

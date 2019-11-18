import {BootFunction} from 'quasar'
import VueMeta from 'vue-meta'

const vueMeta: BootFunction = ({Vue}) => {
  Vue.use(VueMeta)
}

export default vueMeta

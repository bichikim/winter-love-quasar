import PortalVue from 'portal-vue'
import {BootFileFunction} from 'src/types'

const boot: BootFileFunction = ({Vue}) => {
  Vue.use(PortalVue)
}

export default boot

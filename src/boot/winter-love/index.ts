import {BootFileFunction} from 'src/types'
import WPage from './WPage.vue'


const boot: BootFileFunction = ({Vue}) => {
  Vue.component('w-page', WPage)
}

export default boot

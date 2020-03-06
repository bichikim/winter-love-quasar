import {Component, Vue} from 'vue-property-decorator'
import Aside from './aside'


@Component
export default class Store extends Vue {
  readonly aside: Aside = new Aside()
}

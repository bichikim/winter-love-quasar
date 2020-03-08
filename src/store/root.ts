import {Component, Vue} from 'vue-property-decorator'
import Aside from './aside'
import Auth from './auth'

@Component
export default class Store extends Vue {
  readonly aside: Aside = new Aside()
  readonly auth: Auth = new Auth()
}

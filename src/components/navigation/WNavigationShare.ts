import {NavItem} from './types'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class WNavigationShare extends Vue {
  @Prop({required: true, type: Array}) items: NavItem[]
}

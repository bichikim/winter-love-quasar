import {Component, Prop, Vue} from 'vue-property-decorator'
import {NavItem} from './types'

@Component
export default class WNavigationShare extends Vue {
  @Prop({required: true, type: Array}) items: NavItem[]
}

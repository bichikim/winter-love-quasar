import {NavItem} from './types'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class WNavigationShare<R extends Record<string, Function>> extends Vue {
  @Prop({required: true, type: Array}) items: (NavItem<R>)[]
}

import {NavItem} from 'src/store/modules/aside'
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class NavigationShare<R extends Record<string, Function>> extends Vue {
  @Prop({required: true, type: Array}) items: (NavItem<R>)[]
}

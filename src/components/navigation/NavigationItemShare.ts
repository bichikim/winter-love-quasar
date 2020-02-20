import {Vue, Prop, Component} from 'vue-property-decorator'
import {NavItem, ExecutionInfo} from '@/store/modules/aside'
import {RawLocation} from 'vue-router'

@Component
export default class NavigationItemShare<R  extends Record<string, Function>>
  extends Vue implements NavItem {

  @Prop() icon?: string
  @Prop() title: string
  @Prop() replace?: RawLocation
  @Prop() push?: RawLocation
  @Prop() run?: ExecutionInfo<R>
  @Prop() items?: (NavItem<R>)[]
}

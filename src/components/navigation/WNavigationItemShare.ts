import {Vue, Prop, Component} from 'vue-property-decorator'
import {NavItem, ExecutionInfo} from './types'
import {RawLocation} from 'vue-router'

/**
 * NavItem component implementation
 */
@Component
export default class WNavigationItemShare<R  extends Record<string, Function>>
  extends Vue implements NavItem {

  @Prop() icon?: string
  @Prop() title: string
  @Prop() replace?: RawLocation
  @Prop() push?: RawLocation
  @Prop() run?: ExecutionInfo<R>
  @Prop() items?: (NavItem<R>)[]

  get myTitle() {
    return this.$t(this.title)
  }
}

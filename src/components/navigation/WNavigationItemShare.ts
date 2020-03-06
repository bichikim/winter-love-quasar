import {Vue, Prop, Component} from 'vue-property-decorator'
import {NavItem, ExecutionInfo} from './types'
import {RawLocation} from 'vue-router'

/**
 * NavItem component implementation
 */
@Component
export default class WNavigationItemShare extends Vue implements NavItem {

  @Prop() icon?: string
  @Prop() title: string
  @Prop() replace?: RawLocation
  @Prop() push?: RawLocation
  @Prop() run?: ExecutionInfo
  @Prop() items?: NavItem[]
  @Prop() active: boolean
  @Prop() disable: boolean

  get myTitle() {
    return this.$t(this.title)
  }
}

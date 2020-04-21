import {pick} from 'lodash'
import {Component, Prop, Vue} from 'vue-property-decorator'
import {RawLocation} from 'vue-router'
import {ExecutionInfo, NavItem} from './types'

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

  get clickInfo() {
    return pick(this.$props, ['push', 'replace', 'run'])
  }
}

import {kebabCase, trimStart} from 'lodash'
import Translation from 'src/mixins/Translation'
import {Component, Prop} from 'vue-property-decorator'
import {NavItem, NavTo} from './types'


/**
 * Render nested Nav Items Mixin
 */
@Component
export default class DynamicItemMixin extends Translation {
  @Prop({required: true}) item: NavItem
  @Prop({default: 0.5}) contentInsetLevel: number
  @Prop({default: true}) expandSeparator: boolean

  get title() {
    const {item} = this
    const {titleTranslation = true, title} = item
    if(titleTranslation) {
      return this.$ts(title)
    }
    return title
  }

  get icon() {
    return this.item.icon
  }

  /**
   * Nav To getter
   */
  get to(): NavTo {
    const {to, title} = this.item
    if(!to) {
      return {path: kebabCase(title)}
    }
    if(typeof to === 'string') {
      return {path: to}
    }
    return {...to}
  }

  /**
   * Passing 'to' to parent
   * @param to
   */
  handleTo(to: NavTo) {
    const {path} = to
    const {path: myPath} = this.to
    let myTo = to
    if(path && myPath && /^\.\//.test(path)) {
      const _path = trimStart(path, './')
      myTo = {
        ...myTo,
        path: [myPath, _path].join('/'),
      }
    }
    /**
     * When it needs to go to somewhere
     * @event to
     * @type {NavTo}
     */
    this.$emit('to', myTo)
  }

  handleClick() {
    /**
     * When it needs to go to somewhere
     * @event to
     * @type {NavTo}
     */
    this.$emit('to', this.to)
  }
}

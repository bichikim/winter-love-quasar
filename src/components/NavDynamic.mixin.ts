import {Component, Prop, Vue} from 'vue-property-decorator'
import {NavItem, NavTo} from './types/navigation'

/**
 * Render nested Nav Items Mixin
 */
@Component
export default class NavDynamicMixin extends Vue {
  @Prop() item: NavItem
  @Prop({default: 0.5}) contentInsetLevel: number
  @Prop({default: true}) expandSeparator: boolean

  get title() {
    return this.item.title
  }

  get icon() {
    return this.item.icon
  }

  get path() {
    const {to, title} = this.item
    if(!to){
      return title
    }
    if(typeof to === 'string'){
      return to
    }
    return to.path ? to.path : title
  }

  handleTo(to: NavTo) {
    const {path} = to
    let myTo = to
    if(path && /^\//.test(path)){
      myTo = {
        ...myTo,
        path: [this.path, path].join('/'),
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
    const {to} = this.item
    let myTo: any = to
    if(typeof to === 'string'){
      myTo = {
        path: to,
      }
    }
    /**
     * When it needs to go to somewhere
     * @event to
     * @type {NavTo}
     */
    this.$emit('to', myTo)
  }
}

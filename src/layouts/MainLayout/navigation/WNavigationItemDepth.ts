import {Component, Prop, Vue} from 'vue-property-decorator'

/**
 * Navigation Item style Props
 */
@Component
export default class WNavigationItemShare extends Vue {
  /**
   * Button ripple animation
   * @link https://quasar.dev/vue-directives/material-ripple#Ripple-API
   */
  @Prop({default: true, type: Boolean}) ripple: boolean

  /**
   * depths tap size
   * @example
   *                + For
   *   insetLabel ->__+ Bar
   */
  @Prop({default: 0.25, type: Number}) insetLabel: number

  /**
   * Current insetLabel depth
   */
  @Prop({default: 0, type: Number}) depth: number

  get myHeadInsetLevel() {
    const label = this.insetLabel * this.depth
    // label 0 has mini mode icon error
    return label > 0 ? label : undefined
  }
}

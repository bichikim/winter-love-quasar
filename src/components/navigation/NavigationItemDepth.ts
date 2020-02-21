import {Vue, Prop, Component} from 'vue-property-decorator'

@Component
export default class NavigationItemShare<R  extends Record<string, Function>>
  extends Vue {

  @Prop({default: true, type: Boolean}) ripple: boolean
  @Prop({default: 0.25, type: Number}) insetLabel: number
  @Prop({default: 0, type: Number}) depth: number
}

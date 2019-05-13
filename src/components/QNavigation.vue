<template lang="pug">
  q-drawer(
    show-if-above
    :value="value"
    @input="handleInput"
    v-bind="{bordered, elevated}"
    )
    .frame
      .user-frame.q-header--bordered
        slot
      q-scroll-area.nav-frame.q-pa-sm
        q-list
          template(v-for="(item) in items")
            q-dynamic-nav-item(:item="item" @to="handleTo")
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import QDynamicNavItem from './QDynamicNavItem.vue'
import {NavItem, NavTo} from './types/navigation'

/**
 * Aside navigation
 */
@Component({
  components: {
    QDynamicNavItem,
  },
})
export default class Navigation extends Vue {

  /**
   * Nav items
   */
  @Prop() items: NavItem[]

  /**
   * Show shadow
   * @default false
   */
  @Prop({default: false}) elevated: boolean

  /**
   * Show borer
   * @default true
   */
  @Prop({default: true}) bordered: boolean

  /**
   * Open or not
   * @default false
   */
  @Prop({default: false}) value: boolean

  handleInput(value: boolean) {
    /**
     * When it changed value
     * @event input
     * @type {boolean}
     */
    this.$emit('input', value)
  }

  handleTo(to: NavTo) {
    /**
     * When it needs to go to somewhere
     * @event to
     * @type {NavTo}
     */
    this.$emit('to', to)
  }
}

</script>
<style scoped lang="stylus">
  .frame
    display flex
    flex-direction column
    width 100%
    height 100%
    .user-frame
      flex-grow 0
      flex-shrink 0
      flex-basis 150px
    .nav-frame
      flex-grow 1
      flex-shrink 1
      flex-basis auto
</style>

<template lang="pug">
  q-drawer(
    show-if-above
    :value="value"
    @input="handleInput"
    v-bind="{bordered, elevated}"
    )
    q-scroll-area.fit.q-pa-sm
      q-list
        template(v-for="(item) in items")
          q-dynamic-nav-item(:item="item" @to="handleTo")
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import {NavItem, NavTo} from './types/navigation'
import QDynamicNavItem from './QDynamicNavItem.vue'

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

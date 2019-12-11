<template lang="pug">
  q-drawer.q-navigation(
    show-if-above
    @input="handleInput"
    v-bind="{bordered, elevated, value}"
  )
    .frame
      .user-frame
        slot
      q-separator.separator
      .nav-frame
        q-scroll-area.fit
          q-list
            template(v-for="(item) in items")
              q-dynamic-nav-item(:item="item" @to="handleTo")
</template>
<script lang="ts">
  import Translation from '@/mixins/Translation'
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import QDynamicNavItem from './QDynamicNavItem.vue'
  import {NavItem, NavTo} from './types'

  /**
   * Navigation
   * @slot default top empty slot
   */
  @Component({
    components: {
      QDynamicNavItem,
    },
  })
  export default class Navigation extends Mixins(Translation) {

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

<style lang="stylus" scoped>
  .frame
    display flex
    flex-direction column
    overflow hidden
    height 100%
    width 100%

    .user-frame
      flex-grow 0
      flex-shrink 0
      height 150px
      position relative

    .separator
      flex-grow 0
      flex-shrink 0

    .nav-frame
      flex-grow 1
      flex-shrink 1
</style>

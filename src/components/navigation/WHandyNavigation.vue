<template lang="pug">
  q-btn.glass.shadow-3(
    flat dense
    :icon="open ? 'las la-times' : 'las la-bars'"
    size="md"
  )
    q-menu(
      :target="true"
      breakpoint="0"
      :offset="[8, 0]"
      v-model="open"
    )
      w-handy-navigation-list(
        :items="items"
        :side="side"
      )
</template>

<style lang="stylus" scoped>
  .wrapper
    position absolute
</style>

<script lang="ts">
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'

  @Component({
    components: {
      WHandyNavigationList: () => (import('./WHandyNavigationList.vue')),
    },
  })
  export default class WHandyNavigation extends Mixins(WNavigationShare) {
    // open or not
    @Prop({default: true}) value: boolean
    @Prop({default: true}) dense: boolean
    @Prop({default: 300}) maxHeight: number

    /**
     * animation side
     */
    @Prop({default: 'right'}) side: boolean

    open: boolean = false

  }
</script>

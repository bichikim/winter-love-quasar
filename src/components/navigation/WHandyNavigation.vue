<template lang="pug">
  .w-handy-navigation.no-pointer-events
    transition(
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    )
      .fit.row.items-center.q-gutter-x-sm(v-if="value")
        w-handy-navigation-item.glass(:items="items")
</template>

<style scoped lang="stylus">
  .w-handy-navigation
    height 40px

</style>

<script lang="ts">
  import {
    Component, Prop, Inject, Mixins,
  } from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'

  @Component({
    components: {
      WHandyNavigationItem: () => (import('./WHandyNavigationItem.vue')),
    },
  })
  export default class WHandyNavigation extends Mixins(WNavigationShare) {
    // open or not
    @Prop({default: true}) value: boolean

    @Inject({default: {}}) readonly layout: any

    get totalHeight() {
      return this.layout.totalHeight ?? this.$q.screen.height
    }

    get totalWidth() {
      return this.layout.totalWidth ?? this.$q.screen.height
    }
  }
</script>

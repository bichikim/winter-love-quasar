<template lang="pug">
  q-btn.glass.shadow-3(
    flat dense
    :icon="open ? 'las la-times' : 'las la-bars'"
    size="md"
  )
    q-menu(
      :target="true"
      breakpoint="0"
      :offset="[shadowGap, 0]"
      v-model="open"
      :content-style="{width: `${width ||totalWidth }px`, height: `${menuHeight}px`}"
    )

      q-scroll-area.all-pointer-events.wrapper.full-height(
        :key="width"
        :style="{width: `${width || totalWidth}px`, height: `${menuHeight}px`}"
        :visible="false"
      )
        w-handy-navigation-list(
          :items="items"
          :side="side"
          @content-width="width = $event"
          @content-height="height = $event"
          )
          slot
</template>

<style lang="stylus" scoped>
  .wrapper
    position absolute
</style>

<script lang="ts">
  import {Component, Inject, Mixins, Prop} from 'vue-property-decorator'
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

    @Inject({default: {}}) readonly layout: any

    open: boolean = false

    width: number | null = null
    height: number | null = null
    shadowGap: number = 4

    get menuHeight() {
      if(this.height) {
        let height
        if(this.height < this.maxHeight) {
          height = this.height
        } else {
          height = this.maxHeight
        }
        return height + this.shadowGap
      }
      return 0
    }

    get totalWidth() {
      return this.layout.totalWidth ?? this.$q.screen.height
    }
  }
</script>

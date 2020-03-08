<template lang="pug">
  .w-handy-navigation.relative-position.no-pointer-events
    transition(
      :key="side"
      :enter-active-class="`animated ${side === 'right' ? 'fadeInRight' : 'fadeInLeft'}`"
      :leave-active-class="`animated ${side === 'right' ? 'fadeOutRight' : 'fadeOutLeft'}`"
    )
      q-scroll-area.all-pointer-events.wrapper.full-width(
        horizontal
        v-if="value"
        :content-style="{paddingBottom: '5px'}"
        :thumb-style={display: 'none'}
      )
        w-handy-navigation-list.glass(:items="items")
</template>

<style lang="stylus" scoped>
  .wrapper
    height 40px
    overflow-x hidden
    overflow-y unset
    margin-bottom 5px
    touch-action pan-x

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

    /**
     * animation side
     */
    @Prop({default: 'right'}) side: boolean

    @Inject({default: {}}) readonly layout: any

    get totalHeight() {
      return this.layout.totalHeight ?? this.$q.screen.height
    }

    get totalWidth() {
      return this.layout.totalWidth ?? this.$q.screen.height
    }
  }
</script>

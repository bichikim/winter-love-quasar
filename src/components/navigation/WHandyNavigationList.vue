<template lang="pug">
  .w-handy-navigation-list.no-wrap.row.justify-end.no-pointer-events.fit
    .no-wrap.fit(ref="content")
      .wrapper.q-pa-xs(
        ref="wrapper"
        :class="side === 'right' ? 'text-right': 'text-left'"
      )
        slot
        w-handy-navigation-item.navigation-item(
          v-for="(item, key) in items"
          v-bind="item"
          :key="key"
          @click="$emit('click', $event)"
        )
</template>

<style lang="stylus">
  .wrapper
    position absolute

  .w-handy-navigation-list
    min-height 100%

  .navigation-item
    margin-bottom $space-sm.x
    flex-shrink 0

  .navigation-item:last-child
    margin-bottom 0
</style>

<script lang="ts">
  import {Component, Mixins, Prop, Ref, Watch} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'

  @Component({
    components: {
      WHandyNavigationItem: () => (import('./WHandyNavigationItem.vue')),
    },
  })
  export default class WHandyNavigationList extends Mixins(WNavigationShare) {
    @Prop({default: 'right'}) side: number

    @Ref() content?: HTMLDivElement
    @Ref() wrapper?: HTMLDivElement

    wrapperWidth: null | number = null
    wrapperHeight: null | number = null

    @Watch('wrapperWidth')
    __contentWidth(value) {
      this.$emit('content-width', value)
    }

    @Watch('wrapperHeight')
    __wrapperWidth(value) {
      this.$emit('content-height', value)
    }

    updateContentWidth() {
      this.wrapperHeight = this.wrapper?.clientHeight || null
      this.wrapperWidth = this.wrapper?.clientWidth || null
    }

    mounted() {
      this.updateContentWidth()
    }

    updated() {
      this.updateContentWidth()
    }
  }
</script>

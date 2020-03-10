<template lang="pug">
  .w-handy-navigation-list.no-wrap.row.justify-end.no-pointer-events
    .column.q-pr-xs.justify-end.no-wrap(ref="content")
      .wrapper(ref="wrapper")
        w-handy-navigation-item.navigation-item(
          v-for="(item, key) in items"
          v-bind="item"
          :key="key"
          @click="$emit('click', $event)"
        )
</template>

<style lang="stylus">
  .w-handy-navigation-list
    min-height 100%
  .navigation-item
    margin-bottom $space-sm.x
    flex-shrink 0

  .navigation-item:last-child
    margin-bottom 0
</style>

<script lang="ts">
  import {Component, Mixins, Ref, Watch} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'

  @Component({
    components: {
      WHandyNavigationItem: () => (import('./WHandyNavigationItem.vue')),
    },
  })
  export default class WHandyNavigationList extends Mixins(WNavigationShare) {
    @Ref() content?: HTMLDivElement
    @Ref() wrapper?: HTMLDivElement


    contentWidth: null |  number = null
    wrapperHeight: null | number = null


    @Watch('contentWidth')
    __contentWidth(value) {
      this.$emit('change-content-width', value)
    }

    @Watch('wrapperHeight')
    __wrapperWidth(value) {
      this.$emit('change-content-height', value)
    }

    updateContentWidth() {
      this.wrapperHeight = this.wrapper?.clientHeight || null
      this.contentWidth = this.content?.clientWidth || null
    }

    mounted() {
      this.updateContentWidth()
    }

    updated() {
      this.updateContentWidth()
    }
  }
</script>

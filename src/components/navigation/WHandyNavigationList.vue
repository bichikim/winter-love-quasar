<template lang="pug">
  .w-handy-navigation-list.row.no-wrap
    w-handy-navigation-item.navigation-item(
      v-for="(item, key) in items"
      v-bind="item"
      :key="key"
      @click="$emit('click', $event)"
    )
</template>

<style lang="stylus">
  .navigation-item
    margin-right $space-sm.x
    flex-shrink 0

  .navigation-item:last-child
    margin-right 0
</style>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'

  @Component({
    components: {
      WHandyNavigationItem: () => (import('./WHandyNavigationItem.vue')),
    },
  })
  export default class WHandyNavigationList extends Mixins(WNavigationShare) {

  }
</script>

<template lang="pug">
  .w-handy-navigation-list
    w-handy-navigation-item(
      v-for="(item, key) in items"
      v-bind="item"
      :key="key"
      @click="$emit('click', $event)"
    )
</template>

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

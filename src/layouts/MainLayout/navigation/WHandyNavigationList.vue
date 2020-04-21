<template lang="pug">
  q-card.glass.q-ma-sm
    q-list.q-pa-xs
      w-handy-navigation-item.navigation-item(
        v-for="(item, key) in items"
        v-bind="item"
        :key="key"
        @click="$emit('click', $event)"
      )
</template>

<script lang="ts">
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'
  import WHandyNavigationItem from './WHandyNavigationItem.vue'

  @Component({
    components: {
      WHandyNavigationItem,
    },
  })
  export default class WHandyNavigationList extends Mixins(WNavigationShare) {
    @Prop({default: 'right'}) side: number
  }
</script>

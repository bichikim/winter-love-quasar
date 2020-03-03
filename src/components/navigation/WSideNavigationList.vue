<template lang="pug">
  q-list(v-if="items" padding ref="list")
    w-side-navigation-item(
      v-for="(item, key) in items"
      v-bind="item"
      :insetLabel="insetLabel"
      :depth="depth"
      :key="key"
      @click="$emit('click', $event)"
    )
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Mixins,
  } from 'vue-property-decorator'
  import NavigationItemDepth from 'src/components/navigation/WNavigationItemDepth'
  import WNavigationShare from 'src/components/navigation/WNavigationShare'

  @Component({
    components: {
      WSideNavigationItem: () => (import('src/components/navigation/WSideNavigationItem.vue')),
    },
  })
  export default class WSideNavigationList extends Mixins(WNavigationShare, NavigationItemDepth) {
  }
</script>

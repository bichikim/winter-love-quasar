<template lang="pug">
  q-list(v-if="items" padding ref="list")
    side-navigation-item(
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
  import NavigationItemDepth from './NavigationItemDepth'
  import NavigationShare from './NavigationShare'
  import {QList} from 'quasar'

  @Component({
    components: {
      SideNavigationItem: () => (import('./SideNavigationItem.vue')),
    },
  })
  export default class SideNavigationList extends Mixins(NavigationShare, NavigationItemDepth) {
  }
</script>

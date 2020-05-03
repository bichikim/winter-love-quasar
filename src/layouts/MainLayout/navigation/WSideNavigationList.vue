<template lang="pug">
  q-list.w-side-navigation-list(v-if="items" padding ref="list")
    w-side-navigation-item(
      v-for="(item, key) in items"
      v-bind="item"
      :insetLabel="insetLabel"
      :depth="depth"
      :key="key"
      @click="$emit('click', $event)"
    )
</template>

<script lang="ts">
  import NavigationItemDepth from './WNavigationItemDepth'
  import WNavigationShare from './WNavigationShare'
  import {Component, Mixins} from 'vue-property-decorator'

  @Component({
    components: {
      WSideNavigationItem: () =>
        import(
          /* webpackMode: "eager" */
          './WSideNavigationItem.vue'
        ),
    },
  })
  export default class WSideNavigationList extends Mixins(
    WNavigationShare,
    NavigationItemDepth
  ) {}
</script>

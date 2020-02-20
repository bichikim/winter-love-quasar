<template lang="pug">
  // has items
  q-expansion-item.text-capitalize.side-navigation-item(
    v-if="items"
    :icon="icon"
    :label="title"
    :header-inset-level="insetLabel * depth"
  )
    // header
    template(#header)
      .fit.absolute-top-left(v-ripple v-if="ripple")
      q-item-section(avatar v-if="icon")
        q-icon(:name="icon")
      q-item-section {{title}}
    // default
    side-navigation-item-list(:items="items" :depth="depth + 1")
  // has no items
  q-item.text-capitalize(clickable v-ripple="ripple" v-else :inset-level="insetLabel * depth")
    q-item-section(avatar v-if="icon")
      q-icon(:name="icon")
    q-item-section {{title}}

</template>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator'
  import NavigationItemShare from './NavigationItemShare'
  import NavigationItemDepth from './NavigationItemDepth'

  @Component({
    components: {
      SideNavigationItemList: () => (import('./SideNavigationList.vue')),
    },
  })
  export default class SideNavigationItem extends Mixins(NavigationItemShare, NavigationItemDepth) {
  }
</script>

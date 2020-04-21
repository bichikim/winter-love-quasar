<template lang="pug">
  // has items
  q-expansion-item.side-navigation-item.text-capitalize.overflow-hidden(
    v-if="items"
    :header-inset-level="myHeadInsetLevel"
    @click="onClick"
  )
    // header
    template(#header)
      .fit.absolute-top-left(v-ripple v-if="ripple")
      q-item-section(avatar v-if="icon")
        q-icon(:name="icon")
      q-item-section
        span.ellipsis.full-width {{myTitle}}
    // default
    w-side-navigation-item-list(:items="items" :depth="depth + 1" @click="$emit('click', $event)")
  // has no items
  q-item.side-navigation-item.text-capitalize.overflow-hidden(
    clickable
    v-ripple="ripple"
    v-else
    :inset-level="myHeadInsetLevel"
    @click="onClick"
  )
    q-item-section(avatar v-if="icon")
      q-icon(:name="icon")
    q-item-section
      span.ellipsis.full-width {{myTitle}}

</template>

<script lang="ts">
  import NavigationItemDepth from './WNavigationItemDepth'
  import WNavigationItemShare from './WNavigationItemShare'
  import {Component, Emit, Mixins, Prop} from 'vue-property-decorator'

  @Component({
    components: {
      WSideNavigationItemList: () => (import(
        /* webpackMode: "eager" */
        './WSideNavigationList.vue')),
    },
  })
  export default class WSideNavigationItem extends Mixins(WNavigationItemShare,
    NavigationItemDepth) {

    /**
     * Whether the expansion item will also emit click event
     */
    @Prop({default: false}) expansionClick: boolean

    /**
     * When an item is clicked
     */
    @Emit('click')
    onClick() {
      return this.clickInfo
    }
  }
</script>

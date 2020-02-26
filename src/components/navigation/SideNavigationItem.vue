<template lang="pug">
  // has items
  q-expansion-item.side-navigation-item.text-capitalize.overflow-hidden(
    v-if="items"
    :header-inset-level="myHeadInsetLevel"
    @click="(event) => {expansionClick && onClick(event)}"
  )
    // header
    template(#header)
      .fit.absolute-top-left(v-ripple v-if="ripple")
      q-item-section(avatar v-if="icon")
        q-icon(:name="icon")
      q-item-section
        span.ellipsis.full-width {{myTitle}}
    // default
    side-navigation-item-list(:items="items" :depth="depth + 1" @click="$emit('click', $event)")
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
  import {pick} from 'lodash'
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import NavigationItemDepth from './NavigationItemDepth'
  import NavigationItemShare from './NavigationItemShare'

  @Component({
    components: {
      SideNavigationItemList: () => (import('./SideNavigationList.vue')),
    },
  })
  export default class SideNavigationItem extends Mixins(NavigationItemShare, NavigationItemDepth) {
    /**
     * white list of data to send by the click event
     */
    static clickInfo: (keyof NavigationItemShare<any>)[] = ['push', 'replace', 'run']

    /**
     * Whether the expansion item will also emit click event
     */
    @Prop({default: false}) expansionClick: boolean

    /**
     * When an item is clicked
     */
    onClick() {
      this.$emit('click', pick(this.$props, SideNavigationItem.clickInfo))
    }
  }
</script>

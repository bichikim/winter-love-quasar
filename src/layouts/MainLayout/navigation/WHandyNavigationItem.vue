<template lang="pug">
  q-item(clickable v-close-popup v-ripple @click="$emit('click', clickInfo)")
    q-item-section(avatar)
      q-icon(:name="icon")
    q-item-section {{myTitle}}
</template>

<style lang="stylus" scoped>
  .q-btn::v-deep
    .q-btn__content
      flex-wrap nowrap

      div
        white-space nowrap
</style>

<script lang="ts">
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import WNavigationItemShare from './WNavigationItemShare'

  @Component
  export default class WHandyNavigationItem extends Mixins(WNavigationItemShare) {
    @Prop({default: true}) dense: boolean
  }
</script>

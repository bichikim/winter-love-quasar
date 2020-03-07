<template lang="pug">
  q-btn.glass.q-pr-sm.text-capitalize.all-pointer-events(
    :label="myTitle"
    :icon="icon"
    v-bind="{dense}"
    no-caps
  )
</template>

<style lang="stylus" scoped>
</style>

<script lang="ts">
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import WNavigationItemShare from './WNavigationItemShare'

  @Component
  export default class WHandyNavigationItem extends Mixins(WNavigationItemShare) {
    @Prop({default: true}) dense: boolean
  }
</script>

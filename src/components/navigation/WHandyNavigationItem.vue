<template lang="pug">
  q-btn(:lable="title" :icon="icon")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Mixins,
  } from 'vue-property-decorator'
  import WNavigationItemShare from './WNavigationItemShare'

  @Component
  export default class WHandyNavigationItem extends Mixins(WNavigationItemShare) {

  }
</script>

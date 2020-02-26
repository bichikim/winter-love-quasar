<template lang="pug">
  .header-navigation
    template(v-for="item in items" )
      q-btn(:label="item.title" :key="item.title + item.icon")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import NavigationShare from './NavigationShare'
  import {
    Component, Mixins, Prop,
  } from 'vue-property-decorator'

  @Component
  export default class HeaderNavigation<R extends Record<string, Function>>
    extends Mixins(NavigationShare) {

  }
</script>

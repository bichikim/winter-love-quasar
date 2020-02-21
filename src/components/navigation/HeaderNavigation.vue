<template lang="pug">
  q-header
    q-toolbar

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

<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    | test
    q-page-container
      router-view
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class InfoLayout extends Vue {
    // empty
  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
</style>

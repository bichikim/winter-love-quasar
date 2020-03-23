<template lang="pug">
  q-page.column.items-center.justify-center
    h1.text-center.text-primary Hello There?
</template>

<style lang="stylus">
  .q-page
    *
      pointer-events all
</style>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class IndexPage extends Vue {

    meta: {}

    hook: any = null
  }
</script>

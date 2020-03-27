<template lang="pug">
  q-page.column.items-center.justify-center
    h1.text-center.text-primary Hello There?
    q-btn(label="test" @click="onClick")
</template>

<style lang="stylus">
  .q-page
    *
      pointer-events all
</style>

<script lang="ts">
  import {Component, Vue, Inject} from 'vue-property-decorator'
  import Store from 'src/store'

  @Component
  export default class IndexPage extends Vue {
    @Inject() store: Store

    meta: {}

    hook: any = null

    onClick() {
      // empty
    }
  }
</script>

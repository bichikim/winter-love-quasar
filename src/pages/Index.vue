<template lang="pug">
  q-page.column.items-center.justify-center
    h1.text-center.text-primary Hello There?
    q-btn.glass(label="emit" @click="onClick")
</template>

<style lang="stylus">
  .q-page
    *
      pointer-events all
</style>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {announcer} from 'src/lib/announcer'

  @Component
  export default class IndexPage extends Vue {

    meta: {}

    hook: any = null

    mounted() {
      this.hook = announcer()
    }

    onClick() {
      this.hook.emit('vuex:mutation', {type: 'nothing ha ha', payload: {foo: 'bar'}}, {foo: 'bar'})
    }
  }
</script>

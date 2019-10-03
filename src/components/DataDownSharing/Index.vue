<template lang="pug">
  parent(
    @save="save"
    @cancel="cancel"
    @skip="skip"
    foo="foo"
    bar="bar"
    john="john"
    tom="tom"
  )
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Parent from './Parent.vue'

  @Component({
    components: {Parent},
  })
  export default class Index extends Vue {
    save() {
      console.log('save')
    }

    cancel() {
      console.log('cancel')
    }

    skip() {
      console.log('skip')
    }

  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
    flex-direction column
</style>

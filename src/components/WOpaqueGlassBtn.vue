<template lang="pug">
  q-btn(:class="shadowClass")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import isNumeric from 'src/validations/is-numeric'

  @Component
  export default class WOpaqueGlassBtn extends Vue {
    static readonly defaultShadowLevel = 3

    @Prop() elevated?: string | number | ''

    get shadowClass(): string {
      const {elevated} = this
      if(elevated === '') {
        return `shadow-${WOpaqueGlassBtn.defaultShadowLevel}`
      }
      if(typeof elevated === 'number' || (typeof elevated === 'string' && isNumeric(elevated, {noSymbols: true}))) {
        return `shadow-${elevated}`
      }
      return  ''
    }
  }
</script>

<template lang="pug">
  w-page(column-center row-center)
    q-card.all-pointer-events.glass.w-max-w-xs.full-width
      q-card-section.text-white.bg-primary
        .text-h6 Sign-in / Sign-up
      q-card-section
        q-input(label="email")
        q-input(label="password")
      q-card-actions.reverse
        q-btn(label="submit")
</template>

<style lang="stylus" scoped>

</style>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator'

  @Component
  export default class SignPage extends Vue {

  }
</script>

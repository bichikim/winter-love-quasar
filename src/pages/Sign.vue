<template lang="pug">
  w-page()
    q-card.all-pointer-events.glass
      q-card-section
        q-input(label="email")
        q-input(label="password")
      q-card-actions.reverse
        q-btn(label="submit")
</template>

<style scoped lang="stylus">

</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  @Component
  export default class SignPage extends Vue {

  }
</script>

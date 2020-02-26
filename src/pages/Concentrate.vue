<template lang="pug">
  .column
    q-knob(
      :step="step"
      v-model="value"
      show-value
      size="90px"
      :thickness="0.22"
      color="lime"
      track-color="lime-3"
      class="text-lime q-ma-md"
    )
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  @Component
  export default class ConcentratePage extends Vue {
    step: number = 40
    value: number = 0
  }
</script>

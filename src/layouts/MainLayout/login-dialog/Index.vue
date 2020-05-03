<template lang="pug">
  q-dialog(:value="value" @input="$emit('input', $event)")
    q-card
      q-card-section
        span hello
</template>

<style scoped lang="stylus"></style>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component
  export default class WLoginDialog extends Vue {
    @Prop({default: false}) value: boolean
  }
</script>

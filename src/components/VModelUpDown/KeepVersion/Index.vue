<template lang="pug">
  input(:value="nativeValue" @input="handleInput")
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator'

  @Component
  export default class Index extends Vue {
    @Prop() value: string

    nativeValue: string | null = null

    @Watch('value', {immediate: true})
    watchValue(value) {
      this.nativeValue = value
    }

    handleInput(value) {
      this.$emit('input', value)
    }
  }
</script>


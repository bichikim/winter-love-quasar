<template lang="pug">
  input(v-model="passValue")
</template>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  @Component
  export default class Index extends Vue {
    @Prop() value: string

    get passValue() {
      return this.value
    }

    set passValue(value) {
      this.$emit('input', value)
    }
  }
</script>

<template lang="pug">
  .component-test {{componentName}}
    slot(v-bind="slotBind")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  interface Action {
    type: 'boolean'
    prop: string
    state: string
  }

  @Component
  export default class ComponentTest extends Vue {
    @Prop() componentName: string
    @Prop() actions: Action[]

    get slotBind() {
      return {}
    }
  }
</script>

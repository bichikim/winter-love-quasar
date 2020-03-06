<template lang="pug">
  .search-bar
    transition(
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    )
      q-input.text-primary.glass(value="hello" dense standout v-show="value")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  @Component
  export default class WSearchBar extends Vue {
    @Prop() value
  }
</script>

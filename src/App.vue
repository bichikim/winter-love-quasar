<template lang="pug">
  #q-app
    router-view
</template>

<script lang="ts">
  import {save} from '@/root'
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
    created() {
      save(this.$root)
    }
  }
</script>

<style>
</style>

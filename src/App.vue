<template lang="pug">
  #q-app
    router-view
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class App extends Vue {
  beforeCreate() {
    //
  }
}
</script>

<style>
</style>

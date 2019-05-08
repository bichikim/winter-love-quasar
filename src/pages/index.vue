<route-meta>
  {"middleware": "authenticated"}
</route-meta>

<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  mounted() {
    //
  }
}
</script>

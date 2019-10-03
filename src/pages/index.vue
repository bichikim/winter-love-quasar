<route-meta>
  {"middleware": "authenticated"}
</route-meta>

<template lang="pug">
  q-page.felx.flex-center
    data-down-sharing
</template>

<style>
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import DataDownSharing from '@/components/DataDownSharing/Index.vue'

@Component({
  components: {
    DataDownSharing,
  },
})
export default class Index extends Vue {
  mounted() {
    //
  }
}
</script>

<template lang="pug">
  earth-map(
    :dark="dark"
  )
    earth-map-marker(:position="{lat: 40.730, lng: -73.935}")
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import {Spot} from './types'

  @Component
  export default class WSpotMap extends Vue {
    @Prop({default: false}) readonly dark: boolean
    @Prop({default: () => []}) spots: Spot[]
  }
</script>

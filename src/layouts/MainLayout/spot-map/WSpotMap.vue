<template lang="pug">
  earth-map(
    :dark="dark"
    :offset="{x: 150, y: 0}"
    :center="center"
  )
    earth-map-marker(:position="{lat: 40.730, lng: -73.935}" clickable)
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
    @Prop({}) center: google.maps.LatLng | google.maps.LatLngLiteral
  }
</script>

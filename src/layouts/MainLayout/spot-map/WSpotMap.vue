<template lang="pug">
  earth-map(
    :dark="dark"
    :offset="{x: 150, y: 0}"
    :center="center"
  )
    earth-map-marker(:position="{lat: 40.730, lng: -73.935}" clickable)
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {Spot} from './types'

  @Component
  export default class WSpotMap extends Vue {
    @Prop({default: false, type: Boolean}) readonly dark: boolean
    @Prop({default: () => [], type: Array}) spots: Spot[]
    @Prop({}) center?: google.maps.LatLng | google.maps.LatLngLiteral
    @Prop({default: () => ({x: 0, y: 0}), type: Object}) offset: {
      x: number
      y: number
    }
  }
</script>

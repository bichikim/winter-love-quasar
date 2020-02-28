<template lang="pug">
  .google-map.fit(ref="googleMap")
    template(v-if="Boolean(google) && Boolean(map)")
      slot(
        :google="google"
        :map="map"
      )
</template>

<style lang="stylus">

</style>

<script lang="ts">
  import {load} from './google-map-api-loader'
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator'
  import darkStyle from './dark.json'
  import lightStyle from './light.json'

  @Component
  export default class WMap extends Vue {
    @Prop() mapConfig?: google.maps.MapOptions
    @Prop({required: true, type: String}) apiKey: string
    @Prop({default: () => ({lat: 40.730, lng: -73.935})}) center: google.maps.LatLng
    @Prop({default: 13}) zoom: number
    @Prop({default: false}) fullscreenControl: boolean
    @Prop({default: false}) scaleControl: boolean
    @Prop({default: false}) streetViewControl: boolean
    @Prop({default: false}) zoomControl: boolean
    @Prop({default: false}) rotateControl: boolean
    @Prop({default: false}) panControl: boolean
    @Prop({default: false}) mapTypeControl: boolean
    @Prop({default: true}) draggable: boolean
    @Prop({default: false}) dark: boolean

    google: null | typeof window.google = null
    map: null | google.maps.Map = null

    async created() {
      this.google = await load(this.apiKey)
      this.initializeMap(this.google)
    }

    @Watch('center')
    __center(value) {
      if(this.map) {
        this.map.setCenter(value)
      }
    }

    @Watch('zoom')
    __zoom(value) {
      if(this.map) {
        this.map.setZoom(value)
      }
    }

    @Watch('options')
    __options(value) {
      if(this.map) {
        this.map.setOptions(value)
      }
    }

    get styles() {
      return this.dark ? darkStyle : lightStyle
    }

    get options() {
      const {
        fullscreenControl, scaleControl, streetViewControl, zoomControl,
        rotateControl, panControl, mapTypeControl, draggable, styles,
      } = this
      return {
        fullscreenControl, scaleControl, streetViewControl, zoomControl,
        rotateControl, panControl, mapTypeControl, draggable, styles,
      }
    }

    initializeMap(google: typeof window.google) {
      const mapContainer: HTMLDivElement = this.$refs.googleMap as any
      const {
        center, zoom, fullscreenControl, scaleControl, streetViewControl,
        zoomControl, rotateControl, panControl, mapTypeControl, draggable,
        styles,
      } = this
      const runner = () => {
        this.map = new google.maps.Map(mapContainer, {
          center, zoom, fullscreenControl, scaleControl, panControl, draggable,
          streetViewControl, zoomControl, rotateControl, mapTypeControl,
          styles,
        })
      }

      if(!mapContainer) {
        this.$nextTick(runner)
        return
      }
      runner()
    }

  }
</script>

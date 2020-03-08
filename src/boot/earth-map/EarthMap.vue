<template lang="pug">
  .google-map.fit(ref="mapContainer")
    template(v-if="Boolean(google) && Boolean(map)")
      slot(
        :google="google"
        :map="map"
      )
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch, Ref,
  } from 'vue-property-decorator'
  import darkStyle from './dark.json'
  import lightStyle from './light.json'
  import Google from './type'

  @Component
  export default class EarthMap extends Vue {
    @Prop() mapConfig?: Google.maps.MapOptions
    @Prop({default: () => ({lat: 40.730, lng: -73.935})}) center: Google.maps.LatLng
    @Prop({default: 13}) zoom: number
    @Prop({default: false}) fullscreenControl: boolean
    @Prop({default: false}) scaleControl: boolean
    @Prop({default: false}) streetViewControl: boolean
    @Prop({default: false}) zoomControl: boolean
    @Prop({default: false}) rotateControl: boolean
    @Prop({default: false}) panControl: boolean
    @Prop({default: false}) mapTypeControl: boolean

    /**
     * whether this.map is draggable
     */
    @Prop({default: true}) draggable: boolean

    /**
     * whether in dark mode
     */
    @Prop({default: false}) dark: boolean

    /**
     * background color in dark mode
     */
    @Prop({default: '#FFFFFF'}) darkBackgroundColor: string

    /**
     * background color in light mode
     */
    @Prop({default: '#333333'}) lightBackgroundColor: string

    /**
     * map style in dark mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => (darkStyle)}) darkMapStyle: any

    /**
     * map style in light mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => (lightStyle)}) lightMapStyle: any
    @Ref() mapContainer?: HTMLDivElement

    /**
     *
     */
    google: null | Google = null
    map: null | Google.maps.Map = null


    created() {
      this.$earthMap.load().then((google) => {
        this.google = google
        this.initializeMap(google)
      })
    }

    // update this.map center
    @Watch('center')
    __center(value) {
      if(this.map) {
        this.map.setCenter(value)
      }
    }

    // update this.map zoom
    @Watch('zoom')
    __zoom(value) {
      if(this.map) {
        this.map.setZoom(value)
      }
    }

    // update this.map options
    @Watch('options')
    __options(value) {
      if(this.map) {
        this.map.setOptions(value)
      }
    }


    // return this.map style
    get styles() {
      return this.dark ? this.darkMapStyle : this.lightMapStyle
    }


    // return back ground color
    get backgroundColor() {
      return this.dark ? this.lightBackgroundColor : this.darkBackgroundColor
    }

    // get options for this.map.setOptions
    get options() {
      const {
        fullscreenControl, scaleControl, streetViewControl, zoomControl,
        rotateControl, panControl, mapTypeControl, draggable, styles,
        backgroundColor,
      } = this
      return {
        fullscreenControl, scaleControl, streetViewControl, zoomControl,
        rotateControl, panControl, mapTypeControl, draggable, styles,
        backgroundColor,
      }
    }

    initializeMap(google: Google) {
      const {mapContainer} = this
      // should render mapContainer before render the map
      if(!mapContainer) {
        return this.$nextTick(() => {
          this.initializeMap(google)
        })
      }
      const {
        center, zoom, fullscreenControl, scaleControl, streetViewControl,
        zoomControl, rotateControl, panControl, mapTypeControl, draggable,
        styles, backgroundColor,
      } = this
      const runner = () => {
        this.map = new google.maps.Map(mapContainer, {
          center, zoom, fullscreenControl, scaleControl, panControl, draggable,
          streetViewControl, zoomControl, rotateControl, mapTypeControl,
          styles, backgroundColor,
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

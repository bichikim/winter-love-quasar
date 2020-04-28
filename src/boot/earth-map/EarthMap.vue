<template lang="pug">
  .google-map.fit(
    :style="containerStyles"
    @touchstart.prevent="onTouchstart"
  )
    .fit(
      ref="mapContainer"
    )
    template(v-if="Boolean(google) && Boolean(map)")
      slot(
        :google="google"
        :map="map"
      )
</template>

<style lang="stylus">

</style>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch, Ref, ProvideReactive,
  } from 'vue-property-decorator'
  import darkStyle from './dark.json'
  import lightStyle from './light.json'
  import Google from './google'
  import blur from 'src/lib/blur-active-element'
  import {snakeCase} from 'lodash'

  @Component
  export default class EarthMap extends Vue {
    @Prop() readonly mapConfig?: Google.maps.MapOptions
    @Prop({default: () => ({lat: 40.730, lng: -73.935})}) readonly center: Google.maps.LatLng
    @Prop({default: 13}) readonly zoom: number
    @Prop({default: false}) readonly fullscreenControl: boolean
    @Prop({default: false}) readonly scaleControl: boolean
    @Prop({default: false}) readonly streetViewControl: boolean
    @Prop({default: false}) readonly zoomControl: boolean
    @Prop({default: false}) readonly rotateControl: boolean
    @Prop({default: false}) readonly panControl: boolean
    @Prop({default: false}) readonly mapTypeControl: boolean

    /**
     * whether this.map is draggable
     */
    @Prop({default: true}) readonly draggable: boolean

    /**
     * whether in dark mode
     */
    @Prop({default: false}) readonly dark: boolean

    /**
     * background color in dark mode
     */
    @Prop({default: '#FFFFFF'}) readonly darkBackgroundColor: string

    /**
     * background color in light mode
     */
    @Prop({default: '#333333'}) readonly lightBackgroundColor: string

    /**
     * map style in dark mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => (darkStyle)}) readonly darkMapStyle: any

    /**
     * map style in light mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => (lightStyle)}) readonly lightMapStyle: any

    @Ref() readonly mapContainer?: HTMLDivElement

    @ProvideReactive() map: null | Google.maps.Map = null
    @ProvideReactive() google: null | Google = null

    currentGeo: any = null

    get containerStyles() {
      return {
        backgroundColor: this.backgroundColor,
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
      } = this
      return {
        fullscreenControl, scaleControl, streetViewControl, zoomControl,
        rotateControl, panControl, mapTypeControl, draggable, styles,
        backgroundColor: 'none',
      }
    }

    created() {
      this.$earthMap.load().then((google) => {
        this.google = google
        this._initializeMap(google)
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

    /**
     * fix google map touch cannot call blur
     */
    onTouchstart() {
      blur()
    }

    private _initializeMap(google: Google) {
      const {mapContainer} = this
      // should render mapContainer before render the map
      if(!mapContainer) {
        return this.$nextTick(() => {
          this._initializeMap(google)
        })
      }
      const {
        center, zoom, options,
      } = this

      const map = new google.maps.Map(mapContainer, {
        center, zoom, ...options,
      })

      // add listeners to the map
      const {$listeners} = this
      Object.keys($listeners).forEach((key: string) => {
        const value = $listeners[key] as any
        map.addListener(snakeCase(key), value)
      })

      this.map = map
    }

  }
</script>

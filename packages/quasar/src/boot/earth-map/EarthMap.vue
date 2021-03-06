<template lang="pug">
  .google-map.fit(
    :class="googleMapWrapperClasses"
    :style="containerStyles"
    @touchstart.prevent="onTouchstart"
  )
    .google-map-container.fit(
      ref="mapContainer"
    )
    template(v-if="Boolean(google) && Boolean(map)")
      slot(
        :google="google"
        :map="map"
      )
</template>

<style lang="stylus">
  .google-map.no-display-gbtn
    a[href^="http://maps.google.com/maps"]
      display none !important

    a[href^="https://maps.google.com/maps"]
      display none !important

  .google-map.korea-grayscale
    img[src^="https://maps.googleapis.com/maps"]
      filter grayscale(100%)  !important
</style>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue,
    Watch,
    Ref,
    ProvideReactive,
  } from 'vue-property-decorator'
  import darkStyle from './dark.json'
  import lightStyle from './light.json'
  import blur from 'src/lib/blur-active-element'
  import {snakeCase} from 'lodash'
  import {PointPosition} from './types'

  @Component
  export default class EarthMap extends Vue {
    @Prop({default: () => ({lat: 40.73, lng: -73.935}), type: Object})
    readonly center: google.maps.LatLng | google.maps.LatLngLiteral
    @Prop({default: 13, type: Number}) readonly zoom: number
    @Prop({default: false, type: Boolean}) readonly fullscreenControl: boolean
    @Prop({default: false, type: Boolean}) readonly scaleControl: boolean
    @Prop({default: false, type: Boolean}) readonly streetViewControl: boolean
    @Prop({default: false, type: Boolean}) readonly zoomControl: boolean
    @Prop({default: false, type: Boolean}) readonly rotateControl: boolean
    @Prop({default: false, type: Boolean}) readonly panControl: boolean
    @Prop({default: false, type: Boolean}) readonly mapTypeControl: boolean
    @Prop({default: false, type: Boolean}) readonly googleButton: boolean
    @Prop({default: true, type: Boolean}) readonly koreaMapGrayscale: boolean

    /**
     * setting center offset
     */
    @Prop({default: () => ({x: 0, y: 0}), type: Object})
    readonly offset: PointPosition

    /**
     * whether this.map is draggable
     */
    @Prop({default: true, type: Boolean}) readonly draggable: boolean

    /**
     * whether in dark mode
     */
    @Prop({default: false, type: Boolean}) readonly dark: boolean

    /**
     * background color in dark mode
     */
    @Prop({default: '#FFFFFF', type: String})
    readonly darkBackgroundColor: string

    /**
     * background color in light mode
     */
    @Prop({default: '#333333', type: String})
    readonly lightBackgroundColor: string

    /**
     * map style in dark mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => darkStyle, type: Array}) readonly darkMapStyle: any

    /**
     * map style in light mode
     * @see https://mapstyle.withgoogle.com/
     */
    @Prop({default: () => lightStyle, type: Array}) readonly lightMapStyle: any

    @Ref() readonly mapContainer?: HTMLDivElement

    @ProvideReactive() map: null | google.maps.Map = null
    @ProvideReactive() google: null | Google = null

    currentGeo: any = null

    get googleMapWrapperClasses() {
      const classes: string[] = []
      if(!this.googleButton) {
        classes.push('no-display-gbtn')
      }
      if(this.koreaMapGrayscale) {
        classes.push('korea-grayscale')
      }
      return classes
    }

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
        fullscreenControl,
        scaleControl,
        streetViewControl,
        zoomControl,
        rotateControl,
        panControl,
        mapTypeControl,
        draggable,
        styles,
      } = this
      return {
        fullscreenControl,
        scaleControl,
        streetViewControl,
        zoomControl,
        rotateControl,
        panControl,
        mapTypeControl,
        draggable,
        styles,
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
        const {offset} = this
        this.map.setCenter(value)
        this.map.panBy(offset.x, offset.y)
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
      const {center, zoom, options, offset} = this

      const map = new google.maps.Map(mapContainer, {
        center,
        zoom,
        ...options,
      })

      this.map = map

      map.panBy(offset.x, offset.y)

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

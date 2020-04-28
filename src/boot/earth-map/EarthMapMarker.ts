import {
  Component, Prop, Vue, Watch, InjectReactive,
} from 'vue-property-decorator'
import Google from './google'
import {snakeCase} from 'lodash'


@Component
export default class EarthMapMarker extends Vue {
  @Prop() readonly position?: Google.maps.LatLng | Google.maps.ReadonlyLatLngLiteral
  @Prop({default: false, type: Boolean}) readonly clickable: boolean
  @Prop() readonly animation?: Google.maps.Animation
  @Prop({default: false, type: Boolean}) readonly crossOnDrag?: boolean
  @Prop() readonly cursor?: string
  @Prop({type: Boolean}) readonly draggable?: boolean
  @Prop() readonly icon?: string | Google.maps.Icon | Google.maps.ReadonlySymbol
  @Prop() readonly label?: string | Google.maps.MarkerLabel
  @Prop() readonly opacity?: number
  @Prop({type: Boolean}) readonly optimized?: boolean
  @Prop() readonly place?: Google.maps.Place
  @Prop() readonly shape?: Google.maps.MarkerShape
  @Prop() readonly title?: string
  @Prop({type: Boolean}) readonly visible?: boolean
  @Prop() readonly zIndex?: number


  @InjectReactive({
    from: 'map',
    default: () => null,
  }) readonly map: Google.maps.Map | null

  @InjectReactive({
    from: 'google',
    default: () => null,
  }) readonly google: Google | null

  marker: Google.maps.Marker | null = null

  @Watch('position')
  __position(position) {
    if(!this.marker) {
      return
    }
    this.marker.setPosition(position)
  }

  @Watch('map')
  __map(map) {
    if(map && this.marker) {
      this.marker.setMap(map)
    }
  }

  @Watch('google', {immediate: true})
  __google(google: Google | null) {
    if(!google) {
      return
    }
    const {position, options, map} = this
    const marker = new google.maps.Marker({
      position,
      map: map || undefined,
      ...options,
    })

    const {$listeners} = this
    Object.keys($listeners).forEach((key: string) => {
      marker.addListener(snakeCase(key), $listeners[key] as any)
    })

    this.marker = marker
  }

  @Watch('options')
  __options(options) {
    if(!this.marker) {
      return
    }
    this.marker.setOptions(options)
  }

  get options() {
    const {
      clickable, animation, crossOnDrag, cursor, draggable, icon, label, opacity,
      optimized, place, shape, title, visible, zIndex,
    } = this
    return {
      clickable, animation, crossOnDrag, cursor, draggable, icon, label, opacity,
      optimized, place, shape, title, visible, zIndex,
    }
  }

  render() {
    return ''
  }
}

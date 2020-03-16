import {Component, Vue} from 'vue-property-decorator'
// import Google from 'src/boot/earth-map/google'

@Component
export default class Map extends Vue {
  // center: Google.maps.LatLng = new Google.maps.LatLng(-34.397, 150.644)
  zoom: number = 8
}

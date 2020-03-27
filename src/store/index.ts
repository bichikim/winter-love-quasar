import {Component} from 'vue-property-decorator'
import Aside from './aside'
import Auth from './auth'
import Map from './map'
import createStoreBus from 'src/store/store-bus'

@Component
export default class Store extends createStoreBus() {
  readonly aside: Aside = new Aside()
  readonly auth: Auth = new Auth()
  readonly map: Map = new Map()


  readonly version: string = process.env.VERSION
}

import {BootFileFunction} from 'src/types'
import {load} from './google-map-api-loader'
import EarthMap from './EarthMap.vue'

interface GoogleApiLoader {
  load(key?: string): Promise<typeof google>
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $earthMap: GoogleApiLoader
  }
}


const boot: BootFileFunction = ({Vue}) => {

  const _key = process.env.VUE_GOOGLE_MAPS_API_KEY

  if(!_key) {
    throw new Error('process.env.VUE_GOOGLE_MAPS_API_KEY is undefined')
  }

  /**
   * load map component
   */
  Vue.component('earth-map', EarthMap)

  Vue.prototype['$earthMap'] = Object.freeze({
    load(key: string = _key) {
      return load(key)
    },
  })
}

export default boot

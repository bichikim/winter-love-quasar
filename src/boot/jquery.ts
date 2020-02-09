import {BootFileFunction} from '@/types'

declare module 'vue/types/vue' {
  interface Vue {
    $jQuery: JQueryStatic
  }
}

const esModule = (value: any) => {
  return value.default || value
}

const jQuery: BootFileFunction = async ({Vue}) => {
  Vue.prototype.$jQuery = esModule(await import('jquery'))
}

export default jQuery

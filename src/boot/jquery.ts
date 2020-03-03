import * as Project from '@/types'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $jQuery: JQueryStatic
  }
}

const esModule = (value: any) => {
  return value.default || value
}

const jQuery: Project.BootFileFunction = async ({Vue}) => {
  Vue.prototype['$jQuery'] = esModule(await import('jquery'))
}

export default jQuery

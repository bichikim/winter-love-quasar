/* tslint:disable:callable-types */
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface QuasarQ {
    platform: any
  }

  interface Vue {
    $q: QuasarQ
  }
}

declare module 'vue/types/options' {
  // noinspection TsLint
  interface ComponentOptions<V extends Vue> {
    preFetch?: (options: any) => void | Promise<void>
    layout?: string
    firebase?: any
  }
}

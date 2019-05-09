declare module 'quasar' {
  import Vue, {VueConstructor, ComponentOptions} from 'vue'
  import VueI18n from 'vue-i18n'
  import VueRouter from 'vue-router'
  import {Store} from 'vuex'

  interface AnimateContext {
    name: string
    duration: number
    to: number
    from: number
    apply: (newProgress: number, progress: number) => any
    done: (progress: number) => any
    cancel: any
    easing: any
  }

  export interface Context<V extends Vue = Vue> {
    Vue: VueConstructor<V>
    app: ComponentOptions<V>
    router: VueRouter
    ssrContext: null | any
    store: Store
  }

  export const Platform: Platform
  export interface Platform {
    parseSSR(ssr: any): any
  }
  export const animate: {
    start: (context: AnimateContext) => void
    stop: (id: string) => void
  }
  export function openURL(url: string, reject: () => void)
}

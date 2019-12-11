import {BootFileFunction} from 'quasar'
import VueRouter, {Route, RawLocation} from 'vue-router'

declare module 'vue-router/types/router' {
  interface VueRouter{
    to: (strategy: 'push' | 'replace', location: RawLocation, options: any) => Promise<Route>
    currentOptions: any

  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $routeOptions: any
  }
}

const vueRouterEx: BootFileFunction = ({Vue}) => {
  Object.defineProperty(VueRouter.prototype, 'currentOptions', {
    value: null,
    writable: true,
  })
  VueRouter.prototype.to = function (strategy, location, options = null) {
    this.currentOptions = options
    if(strategy === 'replace') {
      return this.replace(location)
    }
    return this.push(location)
  }
  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        // eslint-disable-next-line no-unused-expressions
        Vue.util.defineReactive(this, '_routeOptions', this._router.currentOptions)
      }
    },
  })

  Object.defineProperty(Vue.prototype, '$routeOptions', {
    get() {
      return this._routerRoot._routeOptions
    },
  })
}

export default vueRouterEx

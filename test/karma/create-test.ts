import {createLocalVue, shallowMount, ShallowMountOptions, Wrapper} from '@vue/test-utils'
import Vue from 'vue'
import Vuex, {Store, StoreOptions} from 'vuex'

interface App<S = any> {
  store: Store<S>
}

interface ReturnObject {
  app: App,
  localVue: typeof Vue,
  wrapper: Wrapper<Vue>
  store: Store<any>,
}

export interface Options {
  store?: (root: () => Vue) => StoreOptions<any>
  component?: any
  shallow?: ShallowMountOptions<any>
}

const createTest = (options: Options = {}): ReturnObject => {
  let $root: Vue
  let store, wrapper
  const localVue = createLocalVue()

  const root = (): Vue => {
    if($root) {
      return $root
    }
    throw new Error('[createStore] root is not ready')
  }

  localVue.use(Vuex)

  if(options.store) {
    store = new Store(options.store(root))
  } else {
    store = new Store({})
  }

  const mountOptions = options.shallow || {}
  if(options.component) {
    wrapper = shallowMount(options.component, {
      ...mountOptions,
      created(this: Vue) {
        $root = this.$root
      },
      localVue,

    })
  } else {
    wrapper = shallowMount({
      created(this: Vue) {
        $root = this.$root
      },
      name: 'fake',
      render(h) {
        return h('div')
      },
    }, {
      ...mountOptions,
      localVue,
    })
  }


  const app: App = {
    store,
  }

  return {
    app,
    localVue,
    wrapper,
    store,
  }
}

export default createTest

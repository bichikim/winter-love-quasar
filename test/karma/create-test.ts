import {
  createLocalVue,
  MountOptions,
  shallowMount,
  mount,
  ShallowMountOptions,
  VueClass,
  Wrapper, ThisTypedMountOptions, ThisTypedShallowMountOptions,
} from '@vue/test-utils'
import createQuasar from '../create-quasar'
import VueRouter, {RouterOptions} from 'vue-router'
import {QuasarPluginOptions, BootFileFunction, BootFileParams} from 'quasar'
import Vue, {ComponentOptions, FunctionalComponentOptions} from 'vue'
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

export type ComplexComponent = ComponentOptions<Vue> | VueClass<Vue> | FunctionalComponentOptions

export interface Options {
  store?: (root: () => Vue) => StoreOptions<any>
  quasar?: QuasarPluginOptions
  shallowMount?:  [ComplexComponent ,ThisTypedShallowMountOptions<Vue> | ShallowMountOptions<Vue>]
  mount?: [ComplexComponent ,ThisTypedMountOptions<Vue> | MountOptions<Vue>]
  boots?: BootFileFunction[]
  router?: RouterOptions
}

const createTest = async (options: Options = {}): Promise<ReturnObject> => {
  let $root: Vue
  let store, wrapper, router
  const localVue = createLocalVue()
  createQuasar(localVue, options.quasar)

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

  if(options.router) {
    router = new VueRouter( {
      ...options.router,
      mode: 'abstract',
    })
  } else {
    router = new VueRouter({
      mode: 'abstract',
    })
  }


  if(options.shallowMount) {
    const [component, _options] = options.shallowMount
    wrapper = shallowMount(component as any, {
      ..._options,
      created(this: Vue) {
        $root = this.$root
      },
      localVue,
      router,
      store,
    })
  } else if(options.mount) {
    const [component, _options] = options.mount
    wrapper = mount(component as any, {
      ..._options,
      created(this: Vue) {
        $root = this.$root
      },
      localVue,
      router,
      store,
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
      localVue,
      router,
      store,
    })
  }

  const bootFileParams: BootFileParams = {
    Vue: localVue,
    app: wrapper.vm,
    store,
    router,
  }

  if(options.boots) {
    const promises: Array<Promise<any>> = []
    options.boots.forEach((boot) => {
      promises.push(boot(bootFileParams))
    })
    await Promise.all(promises)
  }

  return {
    app: wrapper.vm,
    localVue,
    wrapper,
    store,
  }
}

export default createTest

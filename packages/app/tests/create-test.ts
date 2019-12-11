import {
  createLocalVue,
  mount,
  MountOptions,
  shallowMount,
  ShallowMountOptions,
  ThisTypedMountOptions,
  ThisTypedShallowMountOptions,
  VueClass,
  Wrapper,
} from '@vue/test-utils'
import {BootFileFunction, BootFileParams, QuasarPluginOptions} from 'quasar'
import Vue, {ComponentOptions, FunctionalComponentOptions} from 'vue'
import VueRouter, {RouterOptions} from 'vue-router'
import Vuex, {Store, StoreOptions} from 'vuex'
import createQuasar from './create-quasar'

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

export interface AppOptions {
  store?: (vue: typeof Vue) => StoreOptions<any>
  quasar?: QuasarPluginOptions
  router?: RouterOptions
}

export interface Options extends AppOptions {
  shallowMount?: [ComplexComponent, ThisTypedShallowMountOptions<Vue> | ShallowMountOptions<Vue>]
  mount?: [ComplexComponent, ThisTypedMountOptions<Vue> | MountOptions<Vue>]
  boots?: BootFileFunction[]
}

export const createBootParams = (
  vue: typeof Vue,
  options: AppOptions = {},
  ssrContext = null,
): BootFileParams => {
  let store, router

  createQuasar(vue, options.quasar)

  vue.use(Vuex)

  if(options.store) {
    store = new Store(options.store(vue))
  } else {
    store = new Store({})
  }

  vue.use(VueRouter)

  if(options.router) {
    router = new VueRouter({
      ...options.router,
      mode: 'abstract',
    })
  } else {
    router = new VueRouter({
      mode: 'abstract',
    })
  }

  return {
    Vue: vue,
    app: {router, store} as any,
    ssrContext,
    router,
    store,
  }
}

const createTest = async (options: Options = {}): Promise<ReturnObject> => {
  let wrapper
  const localVue = createLocalVue()
  const {router, store} = createBootParams(localVue, options)

  if(options.shallowMount) {
    const [component, _options] = options.shallowMount
    wrapper = shallowMount(component as any, {
      ..._options,
      localVue,
      router,
      store,
    })
  } else if(options.mount) {
    const [component, _options] = options.mount
    wrapper = mount(component as any, {
      ..._options,
      localVue,
      router,
      store,
    })
  } else {
    wrapper = shallowMount({
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

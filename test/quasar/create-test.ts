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
import {BootFileFunction} from '@/types'
import {BootFileParams, QuasarPluginOptions} from 'quasar'
import Vue, {ComponentOptions, FunctionalComponentOptions} from 'vue'
import VueRouter, {RouterOptions} from 'vue-router'
import Vuex, {Store, StoreOptions} from 'vuex'
import createQuasar from './create-quasar'
import VueI18n, {I18nOptions} from 'vue-i18n'

interface App<S = any> {
  store: Store<S>
}

export interface BootParams extends Omit<BootFileParams, 'app'> {
  app: Record<string, any>
}

export interface ReturnObject {
  app: App,
  localVue: typeof Vue,
  wrapper: Wrapper<Vue>
  store: Store<any>,
}

export type ComplexComponent = ComponentOptions<any> | VueClass<any> | FunctionalComponentOptions

export interface AppOptions {
  store?: (vue: typeof Vue) => StoreOptions<any>
  quasar?: QuasarPluginOptions
  router?: RouterOptions
  i18n?: I18nOptions,
}

export interface Options extends AppOptions {
  shallowMount?: ComplexComponent |
    [ComplexComponent, ThisTypedShallowMountOptions<Vue> | ShallowMountOptions<Vue>]
  mount?: ComplexComponent | [ComplexComponent, ThisTypedMountOptions<Vue> | MountOptions<Vue>]
  boots?: BootFileFunction[]
}

function toBeParameters(mayArray: any | any[]) {
  if(Array.isArray(mayArray)) {
    return mayArray
  }
  return [mayArray]
}

export const createBootParams = (
  vue: typeof Vue,
  options: AppOptions = {},
  ssrContext = null,
): BootParams => {
  let store, router

  createQuasar(vue, options.quasar)

  // must exist  **********************

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

  const app: Record<string, any> = {
    store, router,
  }

  // optional  *************************

  if(options.i18n) {
    Vue.use(VueI18n)
    app.i18n = new VueI18n(options.i18n)
  }


  return {
    Vue: vue,
    app,
    ssrContext,
    router,
    store,
  }
}

const createTest = async (options: Options = {}): Promise<ReturnObject> => {
  let wrapper
  const localVue = createLocalVue()
  const bootParams = createBootParams(localVue, options)
  const {router, store, app} = bootParams

  localVue.config.productionTip = false

  if(options.shallowMount) {
    const [component, _options] = toBeParameters(options.shallowMount)
    wrapper = shallowMount(component as any, {
      ...app,
      ..._options,
      localVue,
    })
  } else if(options.mount) {
    const [component, _options] = toBeParameters(options.mount)
    wrapper = mount(component as any, {
      ...app,
      ..._options,
      localVue,
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

  if(options.boots) {
    const promises: Array<Promise<any>> = []
    options.boots.forEach((boot) => {
      promises.push(boot(bootParams))
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

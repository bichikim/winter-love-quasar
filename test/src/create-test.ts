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
import {BootFileFunction} from 'src/types'
import Vue, {ComponentOptions, FunctionalComponentOptions} from 'vue'
import boot from 'test/src/create-boot'
import createBootParams, {AppOptions} from './create-boot-params'

interface App<S = any> {
  store: typeof Vue.prototype.$store
}

export interface ReturnObject {
  app: App,
  localVue: typeof Vue,
  wrapper: Wrapper<Vue>
  store: typeof Vue.prototype.$store,
}

export type ComplexComponent = ComponentOptions<any> | VueClass<any> | FunctionalComponentOptions

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
    await boot(options.boots, localVue, bootParams)
  }

  return {
    app: wrapper.vm,
    localVue,
    wrapper,
    store,
  }
}

export default createTest

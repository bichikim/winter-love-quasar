import {forEach} from 'lodash'
import Vue from 'vue'
import {VueClass} from 'vue-class-component/lib/declarations'
import {ComponentOptions, PropsDefinition} from 'vue/types/options'
import {CombinedVueInstance} from 'vue/types/vue'

interface Data {
}

interface Methods {

}

interface Computed {
  $rootStore: Vue
  $parentStore: Vue
}

interface Props {
  // actually inject
}

type VueInstance = CombinedVueInstance<Vue, Data, Methods, Computed, Props>

interface StoreBusComponentOptions
  extends ComponentOptions<Vue,
    Data,
    Methods,
    Computed,
    PropsDefinition<Props>,
    Props> {
  __store: StoreBus,
}

class StoreBus {
  private _parent: Vue | null
  private _root: Vue | null

  get parent() {
    return this._parent
  }

  get root() {
    return this._root
  }

  registerParent(parent: Vue) {
    this._parent = parent
  }

  registerRoot(root: Vue) {
    this._root = root
  }
}


const createStoreBus = (): VueClass<VueInstance> => {
  const storeBusComponentOptions: StoreBusComponentOptions = {
    __store: new StoreBus(),
    created(this: any) {
      const {$data} = this
      forEach($data, (data) => {
        if(data && typeof data === 'object' && data.$options && data.$options.__store) {
          data.$options.__store.registerParent(this)
        }
      })
    },
    computed: {
      $rootStore(this: any) {
        let root = this.$parentStore
        while(root && root.$parentStore) {
          root = root.$parentStore
        }
        return root ?? this
      },
      $parentStore(this: any) {
        return this.$options.__store?.parent
      },
    },
  }
  return Vue.extend(storeBusComponentOptions)
}

export default createStoreBus

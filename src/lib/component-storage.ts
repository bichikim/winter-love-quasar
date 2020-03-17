import {cloneDeep} from 'lodash'
import forceDefault from './force-default'
import applyRecord from './apply-record'
import filterRecord from './filter-record'
import Vue, {ComponentOptions} from 'vue'

/**
 * save strategy; pick only and omit except
 */
interface SaveObject {
  /**
   * only filter
   * first filter
   * @example ['foo.bar']
   * {foo: {foo: 'foo', bar: 'bar'} => {foo: {bar: 'bar'}}
   */
  only?: string[]

  /**
   * except filter
   * after only filter
   * @example ['foo.bar']
   * {foo: {foo: 'foo', bar: 'bar'} => {foo: {foo: 'foo'}}
   */
  except?: string[]
}


export interface ComponentStorageComponentOptions extends ComponentOptions<Vue> {
  __componentStorage: ComponentStorage
}

/**
 * componentStorage options
 * @default {}
 */
interface Options {
  /**
   * @default 'component-storage'
   */
  key?: string
  /**
   * @default vue.name or vue.[namespaceGetterName]
   */
  namespace?: string

  /**
   * Namespace name reference (getter | data)
   * @default 'storageName'
   */
  namespaceGetterName?: string

  /**
   * ignore private data to save
   * @default '__'
   */
  privatePrefix?: string

  /**
   * restore when component is created or mounted
   * @default mounted
   */
  restore?: 'created' | 'mounted'

  saves?: {
    session?: SaveObject | boolean
    local?: SaveObject | boolean
    cookie?: SaveObject | boolean
  }
}

export function filterPrivate(target, privatePreFix = '__') {
  return Object.keys(target).reduce((result ,key) => {
    if(!key.startsWith(privatePreFix)) {
      result[key] = target[key]
    }
    return result
  }, {})
}

export function getStorageName(key: string, namespace: string) {
  return `${key}/${namespace}`
}

export function saveLocal(key: string, namespace: string, data: Record<string, any>) {
  localStorage.setItem(getStorageName(key, namespace), JSON.stringify(data))
}

export function getLocal(key: string, namespace: string) {
  return forceDefault(() => {
    const rowData = localStorage.getItem(getStorageName(key, namespace))
    if(rowData) {
      return JSON.parse(rowData)
    }
  }, {})
}

export function saveSession(key: string, namespace: string, data: Record<string, any>) {
  sessionStorage.setItem(getStorageName(key, namespace), JSON.stringify(data))
}

export function getSession(key: string, namespace: string) {
  return forceDefault(() => {
    const rowData = sessionStorage.getItem(getStorageName(key, namespace))
    if(rowData) {
      return JSON.parse(rowData)
    }
  }, {})
}

class ComponentStorage {
  private _vm?: Vue
  private _dataUpdated: boolean = false
  private _namespace?: string
  private _key: string
  private readonly _restore: 'created' | 'mounted'
  private _namespaceGetterName: string
  private _privatePrefix: string
  private _saves: {
    session?: SaveObject | boolean
    local?: SaveObject | boolean
    cookie?: SaveObject | boolean
  }

  constructor(options: Options = {}) {
    this._namespace = options.namespace
    this._key = options.key ?? 'component-storage'
    this._restore = options.restore ?? 'mounted'
    this._namespaceGetterName = options.namespaceGetterName ?? 'storageName'
    this._privatePrefix = options.privatePrefix ?? '__'
    this._saves = cloneDeep(options.saves ?? {})
  }

  init(vm: Vue) {
    if(this._vm) {
      throw new Error('cannot init twice')
    }
    this._vm = vm
  }

  get vm() {
    if(!this._vm) {
      throw new Error('no vm')
    }
    return this._vm
  }

  get key() {
    return this._key
  }

  set key(value: string) {
    this._key = value
  }

  get namespace() {
    return this._namespace ?? this.vm.$options.name
  }

  set namespace(value) {
    this._namespace = value
  }

  /**
   * register watching data
   * supporting vue instance without rendering
   * updated won't be called without rendering
   * @private
   */
  registerDataWatch() {
    const {vm, _privatePrefix} = this
    Object.keys(vm.$data).forEach((key) => {
      if(!key.startsWith(_privatePrefix)) {
        vm.$watch(key, () => {
          if(!this._dataUpdated) {
            this._dataUpdated = true
            vm.$nextTick(() => {
              this._dataUpdated = false
              this.save()
            })
          }
        })
      }
    })
  }

  save() {
    const {vm, _saves: saves, _key, _privatePrefix} = this
    const _namespace = this.getNamespace()
    const data = cloneDeep(vm.$data)

    if(saves.local) {
      const {only = [], except = []} = typeof saves.local === 'boolean' ? {} : saves.local
      saveLocal(_key, _namespace, filterPrivate(filterRecord(data, only, except), _privatePrefix))
    }
    if(saves.session) {
      const {only = [], except = []} = typeof saves.session === 'boolean' ? {} : saves.session
      saveSession(
        _key, _namespace, filterPrivate(filterRecord(data, only, except), _privatePrefix))
    }
    // skip cookie for now
  }

  restore(time: 'mounted' | 'created') {
    const {vm, _saves: saves, _privatePrefix, _key} = this
    const _namespace = this.getNamespace()

    if(this._restore !== time) {
      return
    }

    if(saves.local) {
      const {only = [], except = []} = typeof saves.local === 'boolean' ? {} : saves.local
      applyRecord(
        vm.$data,
        filterPrivate(filterRecord(getLocal(_key, _namespace), only, except), _privatePrefix),
      )
    }

    if(saves.session) {
      const {only = [], except = []} = typeof saves.session === 'boolean' ? {} : saves.session
      applyRecord(
        vm.$data,
        filterPrivate(filterRecord(getSession(_key, _namespace), only, except), _privatePrefix),
      )
    }
  }

  getNamespace() {
    const {vm, _namespaceGetterName, _namespace} = this
    return _namespace ??
      vm[_namespaceGetterName] ??
      vm.$options[_namespaceGetterName]??
      vm.$options.name
  }


}

/**
 * Please use this as mixin
 */
export default function componentStorage(options: Options = {}): ComponentStorageComponentOptions {

  return {
    __componentStorage: new ComponentStorage(options),
    computed: {
      $componentStorage(this: any) {
        return this.$options.__componentStorage
      },
      storageKey: {
        get(this: any) {
          return this.$componentStorage.key
        },
        set(this: any, value: string) {
          this.$componentStorage.key = value
        },
      },
      storageNamespace: {
        get(this: any) {
          return this.$componentStorage.namespace
        },
        set(this: any, value: string) {
          this.$componentStorage.namespace = value
        },
      },
    },
    created(this: any) {
      const {$componentStorage} = this
      $componentStorage.init(this)
      $componentStorage.registerDataWatch()
      $componentStorage.restore('created')

      // mounted won't be called without rendering
      // as mounted
      this.$nextTick(() => {
        $componentStorage.restore('mounted')
        $componentStorage.save()
      })
    },
  }
}


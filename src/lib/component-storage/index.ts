import {cloneDeep} from 'lodash'
import Vue from 'vue'
import {VueClass} from 'vue-class-component/lib/declarations'
import applyRecord from '../apply-record'
import filterRecord from '../filter-record'
import forceDefault from '../force-default'
import Cookie from 'cookie'
import {ClientRequest, ServerResponse} from 'http'

import {
  Options,
  SaveObject,
  StorageComponentOptions,
  VueInstance,
} from './types'


export function filterPrivate(target, privatePreFix = '__') {
  return Object.keys(target).reduce((result, key) => {
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

export function getCookie(key: string, namespace: string) {
  return forceDefault(() => {
    JSON.parse(Cookie.parse(document.cookie)[namespace])
  }, {})
}

/**
 * Whether running the client environment
 */
export function isClient() {
  return typeof window === 'object'
}

export function getSession(key: string, namespace: string) {
  return forceDefault(() => {
    const rowData = sessionStorage.getItem(getStorageName(key, namespace))
    if(rowData) {
      return JSON.parse(rowData)
    }
  }, {})
}

export class ComponentStorage {
  private _dataUpdated: boolean = false
  private readonly _restore: 'created' | 'mounted'
  private _namespaceGetterName: string
  private readonly _privatePrefix: string
  private _requestCookie?: (req) => Record<string, any>
  private _cookieMaxAge: number
  private readonly _saves: {
    session?: SaveObject | boolean
    local?: SaveObject | boolean
    cookie?: SaveObject | boolean
  }
  private _vm?: Vue
  private _namespace?: string
  private _key: string

  get vm() {
    if(!this._vm) {
      throw new Error('no vm')
    }
    return this._vm
  }

  get namespace() {
      return this._namespace ?? this.vm.$options.name
  }

  set namespace(value) {
    this._namespace = value
  }

  get key() {
    return this._key
  }

  set key(value: string) {
    this._key = value
  }

  constructor(options: Options = {}) {
    this._namespace = options.namespace
    this._key = options.key ?? 'component-storage'
    this._restore = options.restore ?? 'mounted'
    this._namespaceGetterName = options.namespaceGetterName ?? 'storageName'
    this._privatePrefix = options.privatePrefix ?? '__'
    this._saves = cloneDeep(options.saves ?? {})
    this._requestCookie = options.requestCookie
    this._cookieMaxAge = options.cookieMaxAge ?? 2147483647
  }

  registerVueInstance(vm: Vue) {
    this._vm = vm
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

  /**
   *
   * @param time call function time flag "created" may run in server side (server has no storage)
   */
  restore(time: 'mounted' | 'created' = 'mounted') {
    const {_saves: saves, _key} = this
    const _namespace = this.getNamespace()

    if(this._restore !== time) {
      return
    }

    if(saves.local) {
      const localData = getLocal(_key, _namespace)
      this.applyRecord(localData, saves.local)
    }

    if(saves.session) {
      const sessionData = getSession(_key, _namespace)
      this.applyRecord(sessionData, saves.session)
    }

    if(saves.cookie) {
      const cookieData  = getCookie(this._key, _namespace)
      this.applyRecord(cookieData, saves.cookie)
    }
  }

  applyRecord(data: Record<string, any>, filter: SaveObject | boolean = true) {
    const {except = [], only = []} = typeof filter === 'boolean' ? {} : filter
    const {_privatePrefix} = this

    applyRecord(
      this.vm.$data,
      filterPrivate(
        filterRecord(
          data,
          only,
          except,
        ),
        _privatePrefix,
      ),
    )
  }

  restoreServerCookie(req: ClientRequest) {
    const {cookie} = this._saves
    const {_requestCookie} = this
    if(!cookie || !_requestCookie) {
      return
    }

    const namespace = this.getNamespace()
    const cookieData = forceDefault(() => {
      const rawCookie = req.getHeader('cookie')
      if(rawCookie) {
        return JSON.parse(Cookie.parse(rawCookie)[namespace])
      }
    }, {})
    this.applyRecord(cookieData, cookie)
  }

  saveServerCookie(res: ServerResponse) {
    const {cookie} = this._saves
    if(!cookie) {
      return
    }

    const {_cookieMaxAge} = this
    const {only = [], except = []} = typeof cookie === 'boolean' ? {} : cookie
    const namespace = this.getNamespace()
    const data = filterPrivate(
      filterRecord(
        cloneDeep(this.vm.$data),
        only, except,
      ),
      this._privatePrefix,
    )
    res.setHeader(
      'Set-Cookie',
      Cookie.serialize(namespace, JSON.stringify(data), {maxAge: _cookieMaxAge}),
    )
  }

  getNamespace() {
    const {vm, _namespaceGetterName, _namespace} = this
    return _namespace ??
      vm[_namespaceGetterName] ??
      vm.$options[_namespaceGetterName] ??
      vm.$options.name
  }

}

/**
 * Please use this as mixin
 */
export function createStorageComponentOptions(options: Options = {}):
  StorageComponentOptions {

  return {
    __componentStorage: new ComponentStorage(options),
    computed: {
      // --> __componentStorage
      $componentStorage(this: any): ComponentStorage {
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
    methods: {
      __restoreServerSideCookie(req: ClientRequest) {
        this.$componentStorage.restoreServerCookie(req)
      },
      __saveServerSideCookie(res) {
        this.$componentStorage.saveServerCookie(res)
      },
    },
    created(this: any) {
      const {$componentStorage} = this

      // register vue instance
      $componentStorage.registerVueInstance(this)
      $componentStorage.registerDataWatch()
      $componentStorage.restore('created')

      // do not restore or save in server side
      if(!isClient()) {
        return
      }

      // mounted won't be called without rendering
      // as mounted
      this.$nextTick(() => {
        $componentStorage.restore('mounted')
        $componentStorage.save()
      })
    },
  }
}

export function createStorage(options: Options): VueClass<VueInstance> {
  return Vue.extend(createStorageComponentOptions(options))
}

export default createStorage

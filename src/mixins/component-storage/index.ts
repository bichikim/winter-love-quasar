import {ClientRequest, ServerResponse} from 'http'
import {cloneDeep, clone} from 'lodash'
import applyRecord from 'src/lib/apply-record'
import filterRecord from 'src/lib/filter-record'
import Vue from 'vue'
import {VueClass} from 'vue-class-component/lib/declarations'

import {Options, SaveObject, StorageComponentOptions, VueInstance} from './types'

import {
  filterPrivate,
  getCookie,
  getLocal,
  getServerCookie,
  getSession,
  isClient,
  saveCookie,
  saveLocal,
  saveServerCookie,
  saveSession,
} from './utils'

/**
 * please add this mixin first then others
 */
export class ComponentStorage {
  private _dataUpdated: boolean = false
  private readonly _restore: 'created' | 'mounted'
  private _namespaceGetterName: string
  private readonly _privatePrefix: string
  private _requestCookie?: (req) => Record<string, any>
  private readonly _cookieOptions: any
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
    this._cookieOptions = options.cookieOptions
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
    const data: Record<string, any> = clone(filterPrivate(vm.$data, _privatePrefix))

    const getFilter = (filter: SaveObject | boolean): {only: string[], except: string[]} => {
      const {only = [], except = []} = typeof filter === 'boolean' ? {} : filter
      return {only, except}
    }

    if(saves.local) {
      const {only, except} = getFilter(saves.local)

      saveLocal(_key, _namespace, filterRecord(data, only, except))
    }

    if(saves.session) {
      const {only, except} = getFilter(saves.session)

      saveSession(
        _key, _namespace, filterRecord(data, only, except))
    }

    if(saves.cookie) {
      const {only, except} = getFilter(saves.cookie)

      saveCookie(
        _key,
        _namespace,
        filterRecord(data, only, except),
        this._cookieOptions,
      )
    }
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
      const cookieData = getCookie(this._key, _namespace)
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
    const {_requestCookie, _key} = this
    if(!cookie || !_requestCookie) {
      return
    }

    const namespace = this.getNamespace()
    const cookieData = getServerCookie(req, _key, namespace)
    this.applyRecord(cookieData, cookie)
  }

  saveServerCookie(res: ServerResponse) {
    const {cookie} = this._saves
    if(!cookie) {
      return
    }

    const {_cookieOptions} = this
    const {only = [], except = []} = typeof cookie === 'boolean' ? {} : cookie
    const namespace = this.getNamespace()
    const data = filterPrivate(
      filterRecord(
        cloneDeep(this.vm.$data),
        only, except,
      ),
      this._privatePrefix,
    )
    saveServerCookie(res, this.key, namespace, data, _cookieOptions)
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
    },
    created(this: VueInstance) {
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

export const createStorage = (options: Options): VueClass<VueInstance> => {
  return Vue.extend(createStorageComponentOptions(options))
}

export default createStorage

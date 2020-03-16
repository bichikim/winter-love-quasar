import {cloneDeep} from 'lodash'
import forceDefault from './force-default'
import applyRecord from './apply-record'
import filterRecord from './filter-record'
import Vue from 'vue'

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


/**
 * Please use this as mixin
 */
export default function componentStorage(options: Options = {}) {
  let namespace = options.namespace
  let key = options.key ?? 'component-storage'
  const {
    restore = 'mounted',
    namespaceGetterName = 'storageName',
    privatePrefix = '__',

  } = options

  const saves = cloneDeep(options.saves ?? {})

  return Vue.extend({
    data() {
      return {
        // eslint-disable-next-line vue/no-reserved-keys
        __dataUpdated: false,
      }
    },
    computed: {
      storageKey: {
        get() {
          return key
        },
        set(value: string) {
          key = value
        },
      },
      storageNamespace: {
        get(this: any) {
          return namespace ?? this.$options.name
        },
        set(value: string) {
          namespace = value
        },
      },
    },
    created(this: any) {
      this.__registerDataWatch()
      this.__restore('created')

      // mounted won't be called without rendering
      // as mounted
      this.$nextTick(() => {
        this.__restore('mounted')
        this.__save()
      })
    },
    methods: {
      /**
       * register watching data
       * supporting vue instance without rendering
       * updated won't be called without rendering
       * @private
       */
      __registerDataWatch() {
        Object.keys(this.$data).forEach((key) => {
          if(!key.startsWith(privatePrefix)) {
            this.$watch(key, () => {
              if(!this.__dataUpdated) {
                this.__dataUpdated = true
                this.$nextTick(() => {
                  this.__dataUpdated = false
                  this.__save()
                })
              }
            })
          }
        })
      },
      // todo need to add __watchChangedNamespace
      /*
       * @private
       */
      __save(this: any) {
        const _namespace = this.__getNamespace()
        const data = cloneDeep(this.$data)

        if(saves.local) {
          const {only = [], except = []} = typeof saves.local === 'boolean' ? {} : saves.local
          saveLocal(key, _namespace, filterPrivate(filterRecord(data, only, except), privatePrefix))
        }
        if(saves.session) {
          const {only = [], except = []} = typeof saves.session === 'boolean' ? {} : saves.session
          saveSession(
            key, _namespace, filterPrivate(filterRecord(data, only, except), privatePrefix))
        }
        // skip cookie for now
      },
      __restore(this: any, time: 'mounted' | 'created') {
        const _namespace = this.__getNamespace()

        if(restore !== time) {
          return
        }

        if(saves.local) {
          const {only = [], except = []} = typeof saves.local === 'boolean' ? {} : saves.local
          applyRecord(
            this.$data,
            filterPrivate(filterRecord(getLocal(key, _namespace), only, except), privatePrefix),
          )
        }

        if(saves.session) {
          const {only = [], except = []} = typeof saves.session === 'boolean' ? {} : saves.session
          applyRecord(
            this.$data,
            filterPrivate(filterRecord(getSession(key, _namespace), only, except), privatePrefix),
          )
        }
      },
      __getNamespace(this: any) {
        return namespace ??
          this[namespaceGetterName] ??
          this.$options[namespaceGetterName]??
          this.$options.name
      },
    },
  })
}


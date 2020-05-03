import Vue from 'vue'
import {ComponentOptions, PropsDefinition} from 'vue/types/options'
import {CombinedVueInstance} from 'vue/types/vue'
import {ComponentStorage} from './index'

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     serverPrefetch(this: V, vm: V)
//   }
// }

/**
 * save strategy; pick only and omit except
 */
export interface SaveObject {
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

export interface Methods {}

export interface Data {}

export interface Computed {
  $componentStorage: ComponentStorage
}

export interface Props {}

export type VueInstance = CombinedVueInstance<Vue, Data, Methods, Computed, Props>

export interface StorageComponentOptions
  extends ComponentOptions<Vue, Data, Methods, Computed, PropsDefinition<Props>, Props> {
  __componentStorage: ComponentStorage
}

/**
 * componentStorage options
 * @default {}
 */
export interface Options {
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
   * Ignore private data to save
   * @default '__'
   */
  privatePrefix?: string

  /**
   * Restore when component is created or mounted
   * @default mounted
   */
  restore?: 'created' | 'mounted'

  /**
   * for restore cookie in server side you must set this
   * @example (req) => (req.cookies)
   */
  requestCookie?: (req) => Record<string, any>

  responseCookie?: (data) => void

  /**
   *
   */
  cookieOptions?: any

  /**
   * Which data the Component Storage will save
   */
  saves?: {
    session?: SaveObject | boolean
    local?: SaveObject | boolean
    cookie?: SaveObject | boolean
  }
}

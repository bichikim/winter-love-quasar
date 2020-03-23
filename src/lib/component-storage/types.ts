import Vue from 'vue'
import {ClientRequest, ServerResponse} from 'http'
import {RawLocation, Route} from 'vue-router'
import {ThisTypedComponentOptionsWithRecordProps} from 'vue/types/options'
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

interface QuasarSsrContext {
  res: ServerResponse
  req: ClientRequest
}

export interface QuasarPreFetchPayload {
  store?: any
  currentRoute: Route
  previousRoute: Route
  redirect: (location: RawLocation) => void
  ssrContext: QuasarSsrContext
}

interface NuxtPreFetchPayload {

}

export interface Methods {
  __serverPrefetch(this: VueInstance, payload)
}

export interface Data {

}

export interface Computed {
  $componentStorage: ComponentStorage
  storageKey: string
  storageNamespace: string
}

export interface Props {

}

export interface VueInstance extends CombinedVueInstance<Vue,
  Data,
  Methods,
  Computed,
  Props> {
}

export interface StorageComponentOptions
  extends ThisTypedComponentOptionsWithRecordProps<
    Vue,
    Data,
    Methods,
    Computed,
    Props> {
  preFetch: (this: VueInstance, payload: QuasarPreFetchPayload) => any
  serverPrefetch: (this: VueInstance) => any
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

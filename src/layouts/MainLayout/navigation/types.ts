import VueRouter, {RawLocation} from 'vue-router'
import {Store} from 'vuex'

export interface ExecutionContext {
  store: Store<any>
  router: VueRouter
}

export type Side = 'left' | 'right'

export type Execution = (context: ExecutionContext, ...args: any[]) => Function

export type FunctionRecord = Record<string, Function>

export interface ExecutionRecord extends Record<string, Execution> {
  to: Execution
  log: Execution
}

export interface ExecutionInfo<R extends FunctionRecord = FunctionRecord> {
  name: string & keyof R
  params?: any[]
}

export type Title = string | ((t: any) => string)

export interface NavItem<R extends FunctionRecord = FunctionRecord> {
  /**
   * q-icon icon name
   */
  icon?: string

  /**
   * q-item-section text
   */
  title: string

  /**
   * If you want to replace page, set RawLocation here
   * Replace === vue-router replace
   */
  replace?: RawLocation

  /**
   * If you want to push, set RawLocation here
   * Push === vue-router push
   */
  push?: RawLocation

  /**
   * If you want to call a Function, use this
   *
   */
  run?: ExecutionInfo<R>

  /**
   * NavItem list Tree structure
   */
  items?: NavItem<R>[]

  /**
   * item is disable
   */
  disable: boolean
}

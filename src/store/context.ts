import {VueConstructor} from 'vue'

export interface ContextRecode extends Record<string, Function> {
  // please override this to use
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    // for sharing utils those are made by boot files
    storeContext: Context
  }
}

/**
 * Context getter & setter
 */
export class Context {
  private readonly _recode: ContextRecode

  constructor() {
    this._recode = {} as any
  }

  exist(name: string): boolean {
    return Boolean(this._recode[name])
  }

  /**
   * get context
   */
  get() {
    return this._recode
  }

  /**
   *
   * @param name
   * @param value
   */
  set(name: string, value: Function) {
    this._recode[name] = value
  }
}

const context = (Vue: VueConstructor) => {
  if(!Vue.storeContext) {
    Vue.storeContext = new Context()
  }

  return Vue.storeContext
}

export default context


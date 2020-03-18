import Vue from 'vue'

const _global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}
export const defaultVueDevToolsGlobalHookName = '__VUE_DEVTOOLS_GLOBAL_HOOK__'


// 'vuex:init' is once emit
type EmitEvents = 'vuex:mutation' | 'vuex:travel-to-state' | 'vuex:commit-all' |
  'vuex:revert-all' | 'vuex:commit' | 'vuex:revert' | 'vuex:import-state' | 'vuex:inspect-state' |
  'vuex:edit-state' | string

interface DevToolHook {
  on(
    name: 'vuex:travel-to-state',
    callback: (targetState: Record<string, any>) => void
  )
  emit(
    name: 'vuex:init',
    store: StoreLike
  )
  emit(
    name: 'vuex:mutation',
    mutation: { type: string, payload: any },
    state: Record<string, any>,
  ): void
}

export function mutation() {
  // empty
}

export function getHook(hookName = defaultVueDevToolsGlobalHookName): undefined | DevToolHook {
  return _global[hookName]
}

export function createFakeStore() {
  return {
    state: {
      foo: 'foo',
    },
    _mutations: {},
    _vm: new Vue(),
    replaceState(state: any) {
      console.log('replaceState', state)
    },
    registerModule(path: string, module, options) {
      console.log('registerModule', path, module, options)
    },
    unregisterModule(path: string) {
      console.log('unregisterModule', path)
    },
  }
}

interface StoreLike<V extends Vue = Vue> {
  state: Record<string, any>
  _vm: V
  _mutations: Record<string, Function>

  replaceState(state: Record<string, any>): void

  registerModule(path: string, module: any, options: any): void

  unregisterModule(path: string): void
}

export function announcer(): DevToolHook {
  const hook = getHook()

  if(!hook) {
    throw new Error('no hook')
  }

  hook.emit('vuex:init', createFakeStore())
  hook.on('vuex:travel-to-state', (targetState) => {
    console.log('vuex:travel-to-state', targetState)
  })

  return hook
}

export default announcer

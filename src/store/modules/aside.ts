import {FunctionModule, RootState} from '@/store/types'
import VueRouter, {RawLocation} from 'vue-router'
import {Store} from 'vuex'

export interface ExecutionContext {
  store: Store<any>
  router: VueRouter
}

export type Execution = (context: ExecutionContext, ...args: any[]) => Function

export interface ExecutionRecord extends Record<string, Execution>{
  to: Execution
  log: Execution
}

export interface ExecutionInfo<R extends Record<string, Function>> {
  name: string & keyof R
  params: any[]
}

export interface NavItem<R extends Record<string, Function> = any> {
  icon?: string
  title: string
  replace?: RawLocation
  push?: RawLocation
  run?: ExecutionInfo<R>
  items?: (NavItem<R>)[]
}

export interface AsideState {
  items: NavItem[]
}

declare module '@/store/types' {
  export interface ModuleState {
    aside: AsideState
  }
}

const module: FunctionModule<AsideState, RootState> = () => {
  return {
    namespaced: true,
    mutations: {},
    state: {
      items: [
        {
          title: 'Concentrate',
          icon: 'ion-timer',
          to: '/main',
          items: [
            {
              title: 'all',
              icon: 'ion-infinite',
              to: '/main/all',
            },
          ],
        },
        {
          title: 'smootie',
          icon: 'ion-snow',
        },
      ],
    },
  }
}

export default module

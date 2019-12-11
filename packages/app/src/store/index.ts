import Vue from 'vue'
import Vuex, {Module} from 'vuex'
import {crateModuleStructure} from './utils'
import {AsideState} from './modules/aside'
import {defaultsDeep} from 'lodash'

export interface RootState {
  aside: AsideState,
}

export interface State {

}

export type FunctionModule<S, R> = (context: typeof Vue.prototype) => Module<S, R>

export const getModules = (context: any) => {
  const moduleFunction = require.context('./modules', true, /\.ts$/)
  const modules = {}
  moduleFunction.keys().forEach((path) => {
    const module = moduleFunction(path)
    defaultsDeep(modules, crateModuleStructure(path, module.default || module, context))
  })
  return modules
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default ({Vue}) => {
  Vue.use(Vuex)
  return new Vuex.Store({
    modules: getModules(Vue.prototype),
    // for dev mode only
    strict: true,
  })
}

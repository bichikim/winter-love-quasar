import Vue from 'vue'
import Vuex from 'vuex'
import {crateModuleStructure} from './utils'
import {AsideState} from './modules/aside'
import {defaultsDeep} from 'lodash'

export interface State {
  aside: AsideState,
}
// import example from './module-example'

Vue.use(Vuex)

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
export default (context) => {
  return new Vuex.Store({
    modules: getModules(context),
    // for dev mode only
    strict: true,
  })
}

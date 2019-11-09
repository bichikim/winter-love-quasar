import {firebase} from '@/boot/firebase'
import {dropRight, last} from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import {AsideState} from './modules/aside'

export interface State {
  aside: AsideState,
}
// import example from './module-example'

Vue.use(Vuex)

// export const getModules = (ctx: any) => {
//   const context = require.context('./modules', false, /\.ts$/)
//   context.keys().forEach((v) => {
//     console.log(v)
//   })
//   // return context.keys().reduce((modules, path: string) => {
//   //   let filename = path
//   //   if(/index\.ts$/.test(filename)) {
//   //     filename = filename.replace(/index\.ts$/, '')
//   //   }
//   //   filename = filename.replace()
//   //   if(!filename) {
//   //     return modules
//   //   }
//   //   filename = dropRight(filename.split('.'), 1).join('.')
//   //   const _module = context(path)
//   //   const myModule = _module.default || _module
//   //   if(typeof myModule === 'function') {
//   //     modules[filename] = myModule(ctx)
//   //     return modules
//   //   }
//   //   modules[filename] = myModule
//   //   return modules
//   // }, [])
// }

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default (context) => {
  return new Vuex.Store({
    // modules: getModules({...context, firebase}),
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: true,
  })
}

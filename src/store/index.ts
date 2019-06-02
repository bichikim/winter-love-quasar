import {firebase} from '@/boot/firebase'
import {dropRight, last} from 'lodash'
import {StoreContext} from 'quasar'
import Vue from 'vue'
import Vuex from 'vuex'
import {AsideState} from './modules/aside'

export interface State {
  aside: AsideState,
}
// import example from './module-example'

Vue.use(Vuex)

const getModules = (ctx: StoreContext) => {
  const context = require.context('./modules', false, /\.ts$/)
  const modules = {}
  context.keys().forEach((path: string) => {
    if(!/\/index\.ts$/.test(path)){
      let filename = last(path.split('/'))
      if(!filename){
        return
      }
      filename = dropRight(filename.split('.'), 1).join('.')
      const _module = context(path)
      const myModule = _module.default || _module
      if(typeof myModule === 'function'){
        modules[filename] = myModule(ctx)
        return
      }
      modules[filename] = myModule
    }
  })
  return modules
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default (context) => {
  return new Vuex.Store({
    modules: getModules({...context, firebase}),
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: true,
  })
}

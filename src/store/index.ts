import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let _store

export const store = () => {
  if(_store) {
    return _store
  }
  _store = new Vuex.Store({
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  })

  return _store
}

export default function (/* { ssrContext } */) {
  const _store = store()
  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */
  if(process.env.DEV && module.hot) {
    // module.hot.accept(['./showcase'], () => {
    //   store.hotUpdate({modules: {showcase: newShowcase}})
    // })
  }

  return _store
}

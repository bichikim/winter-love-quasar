import Vuex from 'vuex'


const store = (ctx) => {
  const {Vue} = ctx
  Vue.use(Vuex)

  return new Vuex.Store({
    state: () => ({}),
  })
}

export default store

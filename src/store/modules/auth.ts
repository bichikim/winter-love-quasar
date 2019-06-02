import {State} from '@/store'
import {StoreContext} from 'quasar'
import Vue from 'vue'
import {Module} from 'vuex'

export interface AuthState {
  name?: string
  accessToken?: string
  link?: string
}

export default <V extends Vue>(
  contex: StoreContext<V>,
): Module<AuthState, State> => {
  return  {
    namespaced: true,
    state: {

    },
    getters: {
      authenticated: (state) => {
        return Boolean(state.accessToken)
      },
    },
  }
}

import {State} from '@/store'
import Vue, {ComponentOptions} from 'vue'
import {Module} from 'vuex'

export interface AuthState {
  name?: string
  accessToken?: string
  link?: string
}

export default <V extends Vue>(
  app: ComponentOptions<V>,
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

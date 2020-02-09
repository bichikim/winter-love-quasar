import {cloneDeep} from 'lodash'
import Vuex, {StoreOptions} from 'vuex'
import {ModuleState} from './types'
import {getModules} from './utils'
import context, {ContextRecode} from './context'

export * from './types'
export * from './utils'

export type LanguageCode = 'en-US' | 'ko-KR'

export interface State {
  language: LanguageCode
}

export interface RootState extends State, ModuleState {
}

export const defaultValue: State = {
  language: 'en-US',
}

export const rootStore = (context: ContextRecode): StoreOptions<State> => {
  const {i18n} = context
  return {
    /**
     * @see https://vuex.vuejs.org/guide/strict.html
     */
    strict: true,
    actions: {
      changeLanguage({commit}, language: LanguageCode) {
        commit('update', {language})
        i18n().locale = language
      },
    },
    state: cloneDeep<State>(defaultValue),
    modules: getModules(context),
    mutations: {
      update(state, payment) {
        Object.assign(state, payment)
      },
    },
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default ({Vue}) => {

  // use Vuex
  Vue.use(Vuex)

  // create Store structure with context
  const options = rootStore(context(Vue).get())

  return new Vuex.Store(options)
}

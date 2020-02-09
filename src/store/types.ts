import {ContextRecode} from './context'
import {AsideState} from './modules/aside'
import {Module} from 'vuex'

export type FunctionModule<S, R> = (context: ContextRecode) => Module<S, R>

export interface ModuleState {
  aside: AsideState,
}

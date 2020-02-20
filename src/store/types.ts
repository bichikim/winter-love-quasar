import {ContextRecode} from './context'
import {Module} from 'vuex'

export type LanguageCode = 'en-US' | 'ko-KR'

export type FunctionModule<S, R> = (context: ContextRecode) => Module<S, R>

export interface ModuleState {

}

export interface State {
  language: LanguageCode
}

export interface RootState extends State, ModuleState {

}


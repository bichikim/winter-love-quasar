import * as Sinai from 'sinai'
import {StoreContext} from 'src/store/type'

export default (ctx: StoreContext) => {
  const context = ctx.Vue.prototype

  class State {
    id: string
    name: string
    email: string
  }

  class Mutation extends Sinai.Mutations<State>() {

  }

  class Actions extends Sinai.Actions<State, Mutation>() {
    hello() {
      console.log('hello')
    }
  }

  return Sinai.module({
    state: State,
    actions: Actions,
  })
}

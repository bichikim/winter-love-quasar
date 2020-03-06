import * as Sinai from 'sinai'

/**
 * auth store
 */
export default (/* ctx: StoreContext */) => {

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

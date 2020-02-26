import * as Sinai from 'sinai'
import {NavItem} from 'src/components/navigation/types'
import {StoreContext} from 'src/store/type'

export default (ctx: StoreContext) => {
  const context = ctx.Vue.prototype

  class State {
    version: number = 0
    items: NavItem[] = [
      {
        title: 'aside.concentrate',
        icon: 'las la-stopwatch',
        push: '/concentrate',
      },
      {
        title: 'aside.smoothie',
        icon: 'las la-snowflake',
      },
    ]
  }

  class Getters extends Sinai.Getters<State>() {
    get isStable() {
      return this.state.version
    }
  }

  return Sinai.module({
    state: State,
    getters: Getters,
  })
}

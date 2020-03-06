import * as Sinai from 'sinai'
import {NavItem} from 'src/components/navigation/types'
import Vue from 'vue'

interface TreeSelectPayload {
  /**
   * selects tree path
   */
  selects: number[]

  /**
   * whether active last select point
   * @default false
   */
  onlyEnd?: boolean
}

/**
 * aside navigation store
 */
export default (/* ctx: StoreContext */) => {

  class State {
    version: number = 0
    items: NavItem[] = [
      {
        title: 'aside.history',
        icon: 'las la-stopwatch',
        active: false,
        disable: false,
        push: '/history',
      },
      {
        title: 'aside.smoothie',
        icon: 'las la-snowflake',
        active: false,
        disable: false,
        push: '/smoothie',
      },
    ]
  }

  class Getters extends Sinai.Getters<State>() {
    get isStable() {
      return this.state.version
    }
  }

  class Mutations extends Sinai.Mutations<State>() {
    active(payload: TreeSelectPayload) {
      const {selects, onlyEnd = false} = payload
      let items: NavItem[] | undefined = this.state.items
      const selectsLastIndex = selects.length - 1

      selects.forEach((select: number, index: number) => {
        // if items is undefined it means selects has a point over aside tree
        if(!items) {
          throw new Error('active no items')
        }
        const item = items[select]

        // if cannot find item it means selects has a point over aside tree
        if(!item) {
          throw new Error('active no item')
        }

        const active = () => (Vue.set(item, 'active', true))

        // check is only active last select point
        if(!onlyEnd) {
          // For observing update
          active()
        } else if(selectsLastIndex === index) {
          // For observing update
          active()
        }

        items = item.items
      })
    }

  }

  return Sinai.module({
    state: State,
    getters: Getters,
    mutations: Mutations,
  })
}

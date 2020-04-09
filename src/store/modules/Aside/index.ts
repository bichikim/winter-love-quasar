import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {store} from 'src/store'
import {NavItem} from 'src/components/navigation/types'

@Module({
  store: store(),
  name: 'aside',
  dynamic: true,
})
class Aside extends VuexModule {
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

export default getModule(Aside)

import {getModule, Module, VuexModule} from 'vuex-module-decorators'
import {store} from 'src/store'
import {NavItem} from 'layouts/MainLayout/navigation/types'

@Module({
  store: store(),
  name: 'aside',
  dynamic: true,
})
class AsideModule extends VuexModule {
  items: NavItem[] = [
    {
      title: 'aside.history',
      icon: 'las la-stopwatch',
      active: false,
      disable: false,
      push: '/history',
    },
    {
      title: 'aside.cart',
      icon: 'las la-snowflake',
      active: false,
      disable: false,
      push: '/smoothie',
    },
  ]
}

export default getModule(AsideModule)

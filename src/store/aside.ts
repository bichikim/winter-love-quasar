import {NavItem} from 'src/components/navigation/types'
import {createStorage} from 'src/mixins/component-storage'
import {Component, Mixins} from 'vue-property-decorator'
import createStoreBus from 'src/store/store-bus'

@Component
export default class Aside extends Mixins(createStorage({
  saves: {
    session: true,
  },
}), createStoreBus()) {
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

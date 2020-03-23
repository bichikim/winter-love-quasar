import {NavItem} from 'src/components/navigation/types'
import {createStorage} from 'src/lib/component-storage'
import {Component, Vue} from 'vue-property-decorator'

@Component({
  mixins: [createStorage({
    saves: {
      session: true,
    },
  })],
})
export default class Aside extends Vue {
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

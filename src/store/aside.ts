import {Component, Vue} from 'vue-property-decorator'
import {NavItem} from 'src/components/navigation/types'

@Component
export default class Aside extends Vue {
  items: NavItem[] = []
}

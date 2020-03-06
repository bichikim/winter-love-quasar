import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Auth extends Vue {
  name: string | null = null
  email: string | null = null
}

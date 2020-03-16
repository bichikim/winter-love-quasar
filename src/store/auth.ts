import {auth} from 'firebase/app'
import componentStorage from 'src/lib/component-storage'
import {Component, Vue} from 'vue-property-decorator'

@Component({
  mixins: [componentStorage({
    saves: {
      session: true,
    },
  })],
})
export default class Auth extends Vue {
  name: string | null = null
  email: string | null = null
  side: 'left' | 'right' = 'right'

  async createUser(email: string, password: string) {
    const response = await auth().createUserWithEmailAndPassword(email, password)
    console.log(response)
  }
}

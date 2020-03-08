import {Component, Vue} from 'vue-property-decorator'
import {auth} from 'firebase/app'

@Component
export default class Auth extends Vue {
  name: string | null = null
  email: string | null = null
  side: 'left' | 'right' = 'right'

  async createUser(email: string, password: string) {
    const response =  await auth().createUserWithEmailAndPassword(email, password)
    console.log(response)
  }
}

import {auth} from 'firebase/app'
import {createStorage} from 'src/lib/component-storage'
import {Component, Mixins} from 'vue-property-decorator'

@Component
export default class Auth extends Mixins(createStorage({
  saves: {
    session: true,
  },
})) {
  name: string | null = null
  email: string | null = null
  side: 'left' | 'right' = 'right'

  async createUser(email: string, password: string) {
    const response = await auth().createUserWithEmailAndPassword(email, password)
    console.log(response)
  }
}

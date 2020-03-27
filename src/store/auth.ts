import {auth} from 'firebase/app'
import {createStorage} from 'src/mixins/component-storage'
import {Component, Mixins} from 'vue-property-decorator'
import createStoreBus from 'src/store/store-bus'

@Component
export default class Auth extends Mixins(createStorage({
  saves: {
    session: {
      except: ['myTest'],
    },
  },
}), createStoreBus()) {
  name: string | null = null
  email: string | null = null
  side: 'left' | 'right' = 'right'

  async createUser(email: string, password: string) {
    const response = await auth().createUserWithEmailAndPassword(email, password)

    console.log(response)
  }
}

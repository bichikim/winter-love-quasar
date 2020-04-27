import {getModule, Module, Mutation, VuexModule, Action} from 'vuex-module-decorators'
import {store} from 'src/store'
import {User} from './types'
import {auth} from 'src/boot/firebase'

const initUser: User = {
  displayName: null,
  email: null,
  photoURL: null,
  phoneNumber: null,
  emailVerified: false,
  uid: null,
}

@Module({
  store: store(),
  name: 'user',
  dynamic: true,
  namespaced: true,
})
class UserModel extends VuexModule implements User {
  displayName: string | null
  email: string | null
  photoURL: string | null
  phoneNumber: string | null
  emailVerified: boolean
  uid: string | null

  constructor(value) {
    super(value)
    this.setUser({...initUser})
    auth().onAuthStateChanged((user) => {
      if(!user) {
        return
      }
      this.setUser(user)
    })
  }

  @Mutation
  setUser(user: User) {
    this.displayName = user.displayName
    this.email = user.email
    this.photoURL = user.photoURL
    this.phoneNumber = user.phoneNumber
    this.emailVerified = user.emailVerified ?? false
    this.uid = user.uid
  }

  @Action
  restoreUser() {
    const user = auth().currentUser
    if(!user) {
      throw new Error('cannot restore user')
    }

  }

  @Action
  signIn(payload: {email: string, password: string}) {
    const {email, password} = payload
    return auth().signInWithEmailAndPassword(email, password)
  }

  @Action
  async signOut() {
    await auth().signOut()
    this.setUser({...initUser})
  }

}

export default getModule(UserModel)

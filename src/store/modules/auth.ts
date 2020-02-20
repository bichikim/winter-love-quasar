import {FunctionModule, RootState} from '@/store/types'


export interface SignUpPayload {
  email: string
  password: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface AuthState {
  uid: string | null
  emailVerified: boolean
  email: string | null
  name: string | null
}

/**
 * register AuthState
 */
declare module '@/store/types' {
  export interface ModuleState {
    auth: AuthState
  }
}

const module: FunctionModule<AuthState, RootState> = ({firebase}) => {
  return {
    namespaced: true,
    state: {
      uid: null,
      email: null,
      name: null,
      emailVerified: false,
    },
    getters: {
      authenticated(state) {
        return Boolean(state.uid)
      },
    },
    actions: {
      async signUp({commit}, payload: SignUpPayload) {
        const {email, password} = payload
        const result = await firebase().auth().createUserWithEmailAndPassword(email, password)
        if(!result || !result.user) {
          return
        }
        const {user} = result
        await firebase().firestore().collection('users').doc(user.uid).set({
          name: user.displayName,
        })
        commit('saveUser', {
          email: user.email,
          emailVerified: user.emailVerified,
          name: user.displayName,
          uid: user.uid,
        })
      },
      async signIn({commit}, payload: SignInPayload) {
        const {email, password} = payload
        const result = await firebase().auth().signInWithEmailAndPassword(email, password)
        if(!result || !result.user) {
          return
        }
        const user = await
          firebase()
          .firestore()
          .collection('users').doc(result.user.uid).get()
        if(!user) {
          return
        }

        const userData = user.data() || {}
        commit('saveUser', {
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          name: userData.name || result.user.displayName,
          uid: result.user.uid,
        })
      },
      async signOut() {
        const result = await firebase().auth().signOut()
        console.log(result)
      },
    },
    mutations: {
      saveUser(state, payload) {
        state.uid = payload.uid
        state.name = payload.name
        state.email = payload.email
        state.emailVerified = payload.emailVerified
      },
    },
  }
}

export default module

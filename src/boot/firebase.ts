import * as Project from '@/types'
import Firebase, {app} from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

interface FirebaseInitOptions {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

declare module '@/store/context' {
  interface ContextRecode {
    firebase: () => (app.App)
  }
}

const firebase: Project.BootFileFunction = ({Vue}, options: FirebaseInitOptions) => {
  if(Vue.storeContext.exist('firebase')) {
    return
  }
  Vue.storeContext.set('firebase', () => (Firebase.initializeApp(options)))
}

export default firebase

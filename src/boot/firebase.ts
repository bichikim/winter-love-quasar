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

const firebase: Project.BootFileFunction = ({Vue}, options: FirebaseInitOptions) => {
  Vue.prototype.$firebase('firebase', () => (Firebase.initializeApp(options)))
}

export default firebase

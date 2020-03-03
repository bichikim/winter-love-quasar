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

declare module 'vue/types/vue' {
  interface Vue {
    readonly $firebase: app.App
  }
}

const boot: Project.BootFileFunction = ({Vue}) => {

  Vue.prototype['$firebase'] = Firebase.initializeApp({
    apiKey: process.env.VUE_FIREBASE_API_KEY,
    authDomain: process.env.VUE_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_FIREBASE_API_ID,
  })

}

export default boot

import Firebase, {app} from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {BootFileFunction} from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $firebase: app.App
  }
}

const firebase: BootFileFunction = ({Vue, store}) => {
  if(Vue.prototype.$firebase) {
    return
  }
  Vue.prototype.$firebase = Firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID,
  })
}

export default firebase

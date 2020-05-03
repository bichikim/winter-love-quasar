import * as Project from 'src/types'
import {app, auth, initializeApp} from 'firebase/app'
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

const boot: Project.BootFileFunction = (context) => {
  const {Vue} = context
  if(Vue.prototype.$firebase) {
    return
  }
  Vue.prototype['$firebase'] = initializeApp({
    apiKey: process.env.VUE_FIREBASE_API_KEY,
    authDomain: `${process.env.VUE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.VUE_FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: process.env.VUE_FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.VUE_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.VUE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_FIREBASE_API_ID,
  })
}

export {auth, app}

export default boot

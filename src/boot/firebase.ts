import Firebase from 'firebase/app'
import 'firebase/firestore'
import {Context} from 'quasar'

let _firebase

export const firebase = () => {
  if(!_firebase){
    _firebase = Firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_API_ID,
    })
  }
  return _firebase
}

export const firestore = () => {
  return _firebase.firestore()
}

export default ({app}: Context) => {
  app.firebase = firebase()
}

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://winter-love.firebaseio.com',
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const createUser = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {test: true})
})

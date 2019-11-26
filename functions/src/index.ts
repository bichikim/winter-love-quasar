import * as functions from 'firebase-functions'
import * as firebase from 'firebase'
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


export const getAccessToken = functions.https.onRequest((request, response) => {
  const user = firebase.auth().currentUser
  if(!user) {
    response.sendStatus(401).send('unauthenticated')
    return
  }

  if(typeof request.body !== 'object') {
    response.send('wrong request')
    return
  }

  const {token} = request.body

  if(!token) {
    response.send('need token')
    return
  }

  response.send({
    token: admin.auth().setCustomUserClaims(user.uid, {test: true}),
  })

})

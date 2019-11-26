import * as functions from 'firebase-functions'
import * as firebase from 'firebase'

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
  }

  if(typeof request.body !== 'object') {
    response.send('wrong request')
  }

  const {token} = request.body

 if(!token) {
    response.send('need token')
  }


})

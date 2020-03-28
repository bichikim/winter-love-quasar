import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {Request} from 'express'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://winter-love.firebaseio.com',
})

const getFirebaseAuth =
  async (request: Request): Promise<admin.auth.DecodedIdToken | undefined> => {
    const hasHeaderAuth = (
      request.headers.authorization && request.headers.authorization.startsWith('Bearer ')
    )
    const hasCookieAuth = (request.cookies && request.cookies.__session)

    let token: string | undefined
    if(hasHeaderAuth) {
      token = request.headers.authorization?.split('Bearer ')[1]
    } else if(hasCookieAuth) {
      token = request.cookies.__session
    }
    if(!token) {
      return
    }

    try {
      return await admin.auth().verifyIdToken(token)
    } catch(e) {
      return undefined
    }
  }

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https
.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const changeUserClaims = functions.https
.onRequest(async (request, response) => {
  const {targetUid, admin = false} = request.body

  if(!targetUid) {
    response.status(400).send('Bad Request')
  }
  const userToken = await getFirebaseAuth(request)

  if(!userToken) {
    response.status(401).send('Unauthorized')
    return
  }

  const UserCollection = admin.firestore().collection('users')
  const User = UserCollection.doc(userToken.uid)
  const userDoc = await User.get()

  if(!userDoc.exists) {
    response.status(403).send('Forbidden')
    return
  }
  const user = userDoc.data()

  if(!user) {
    response.status(403).send('Forbidden')
    return
  }

  if(!user.admin || userDoc.id !== targetUid) {
    response.status(403).send('Forbidden')
    return
  }

  const TargetUser = userDoc.id == targetUid ? User : UserCollection.doc(targetUid)
  const targetDoc = await TargetUser.get()

  if(!targetDoc.exists) {
    response.status(404).send('Not Found')
    return
  }
  const target = targetDoc.data()

  if(!target) {
    response.status(404).send('Not Found')
    return
  }

  target.admin = admin

  await TargetUser.set(target)

  await admin.auth().createCustomToken(targetUid, {admin})

  response.status(200).send(target)
})

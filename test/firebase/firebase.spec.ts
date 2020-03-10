import FirebaseEmulator from './firebase-emulator'
import {initializeTestApp, loadFirestoreRules} from '@firebase/testing'
import firebaseConfig from '../../firebase.json'
import {join} from 'path'
import fs from 'fs'

describe('firebase', function test() {
  const firebaseEmulator = new FirebaseEmulator()
  before(async function startEmulator() {
    this.timeout(50000)
    await firebaseEmulator.start()
    initializeTestApp({
      projectId: 'winter-love',
      auth: {uid: 'test', email: 'test@test.com'},
    })
  })

  after(function stopEmulator() {
    return firebaseEmulator.stop()
  })

  describe('firestore rules', function test() {
    before(function () {
      this.timeout(10000)
      const {firestore = {}} = firebaseConfig
      if(firestore.rules) {
        const rules = fs.readFileSync(join(__dirname, '../../', firestore.rules), 'utf8')
//
        return loadFirestoreRules({
          projectId: 'winter-love',
          rules,
        })
      }
    })

    it('should something', function test() {
      expect(firebaseEmulator.isFinishLoad).to.equal(true)
    })
  })


})

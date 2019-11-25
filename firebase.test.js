const firebase = require('@firebase/testing')
const fs = require('fs')
//
// // start firebase mock [@firebase/testing]
firebase.initializeTestApp({
  projectId: 'winter-love',
  auth: {uid: 'test', email: 'test@test.com'},
})
//
firebase.loadDatabaseRules({
  databaseName: 'winter-love',
  rules: fs.readFileSync('./firestore.rules'),
})
//

const firebase = require('@firebase/testing')
const fs = require('fs')
const {join} = require('path')
const firebaseConfig = require('./firebase.json')
const {database = {}} = firebaseConfig
//
// // start firebase mock [@firebase/testing]
firebase.initializeTestApp({
  projectId: 'winter-love',
  auth: {uid: 'test', email: 'test@test.com'},
})

if(database.rules) {
  const rules = fs.readFileSync(join(__dirname, database.rules), 'utf8')
//
  firebase.loadDatabaseRules({
    databaseName: 'winter-love',
    rules,
  }).then(() => {
    process.send('Database: loaded')
  }).catch((e) => {
    process.send(e)
  })
}

//

const {fork} = require('child_process')
const {join} = require('path')
const child = fork(join(__dirname ,'./firebase.test.js'))

child.on('message', function (data) {
  console.log('child', data)
})

child.on('exit', function (code) {
  console.log('exit', code)
})

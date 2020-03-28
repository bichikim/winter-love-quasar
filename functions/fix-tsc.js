const path = require('path')
const fs = require('fs-extra')
const indexFile = path.resolve('lib/src/index.js')

if(fs.existsSync(indexFile)) {
  fs.copySync(indexFile, path.resolve('lib/index.js'))
}

fs.removeSync(path.resolve('lib/src'))
fs.removeSync(path.resolve('lib/dist'))

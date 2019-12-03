const dotenv = require('dotenv')

module.exports = function env(mode, marge = false) {
  const _path = ['.env']
  if(mode) {
    _path.push(mode)
  }
  const config = dotenv.config({
    path: _path.join('-'),
  })
  if(marge) {
    Object.entries(config).forEach(([key, value]) => {
      process.env[key] = value
    })
  }
  return config
}

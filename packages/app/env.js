const dotenv = require('dotenv')

const DEFAULT_ENV_NAME = '.env'

module.exports = function env(mode, marge = false) {
  const _path = [DEFAULT_ENV_NAME]
  if(mode) {
    _path.push(mode)
  }
  const config = dotenv.config({
    path: _path.join('.'),
  })
  if(marge) {
    Object.entries(config).forEach(([key, value]) => {
      process.env[key] = value
    })
  }
  return config
}

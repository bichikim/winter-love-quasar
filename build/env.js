const dotenv = require('dotenv')

const DEFAULT_ENV_NAME = '.env'

/**
 * get env info by the mode name
 * @param mode NODE_ENV
 * @return object
 */
module.exports = function env(mode) {
  // create env path >>>
  const _path = [DEFAULT_ENV_NAME]
  if(mode) {
    _path.push(mode)
  }
  const path = _path.join('.')
  // <<<

  return dotenv.config({path})
}

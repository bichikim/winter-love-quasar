module.exports = function envReader(env, prefix = '') {
  const stringifyEnv = {}
  Object.keys(env).forEach((key) => {
    const value = env[key]
    const name = key.toUpperCase()
    stringifyEnv[`${prefix}${name}`] = JSON.stringify(value)
  })
  return stringifyEnv
}

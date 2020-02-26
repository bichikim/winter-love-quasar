module.exports = function envReader(env, prefix = 'APP') {
  const _prefix = `${prefix}_`
  return Object.keys(env).reduce((stringifyEnv, key) => {
    if(key.startsWith(_prefix)) {
      const value = env[key]
      const name = key.toUpperCase()
      stringifyEnv[`${name}`] = JSON.stringify(value)
    }
    return stringifyEnv
  }, {})
}

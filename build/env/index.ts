import defaultEnv from './default'

/**
 * Return Environment data
 */
export default (): NodeJS.ProcessEnv => {
  // get env by dotenv
  const env = process.env
  return {
    ...defaultEnv,
    // overriding
    ...env as any,
  }
}

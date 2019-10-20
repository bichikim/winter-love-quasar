import dotenv from 'dotenv'
import defaultEnv from './default'

/**
 * Return Environment data
 * @param path .env path
 */
export default (path?: string): NodeJS.ProcessEnv => {
  // get env by dotenv
  const env = dotenv.config({path}).parsed || {}
  return {
    ...defaultEnv,
    // overriding
    ...env as any,
  }
}

import {BootFileFunction} from 'src/types'
import {BootParams, createBootParams, AppOptions} from './create-boot-params'
import Vue from 'vue'

interface BootResult {
  context: BootParams,
  results: any[]
}

/**
 * boot function test helper
 * @param boots what boot function you want to test
 * @param vue
 * @param appOptions
 */
export const boot = async (
  boots: BootFileFunction[],
  vue: typeof Vue = Vue,
  appOptions?: AppOptions,
): Promise<BootResult> => {

  const _bootParams: BootParams = createBootParams(vue, appOptions)

  const wait = boots.reduce((wait, boot) => {
    wait.push(boot(_bootParams))
    return wait
  }, [] as any[])

  return {
    context: _bootParams,
    results: await Promise.all(wait),
  }
}

export default boot

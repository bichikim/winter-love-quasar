import {BootFileFunction} from 'src/types'
import {BootParams, createBootParams, AppOptions} from './create-boot-params'
import Vue from 'vue'

interface BootResult {
  context: BootParams,
  results: any[]
}

interface BootOptions extends AppOptions {
  bootParams?: BootParams
}

/**
 * boot function test helper
 * @param boots what boot function you want to test
 * @param vue
 * @param bootOptions
 */
export const boot = async (
  boots: BootFileFunction[],
  vue: typeof Vue = Vue,
  bootOptions: BootOptions = {},
): Promise<BootResult> => {
  const {bootParams, ...appOptions} = bootOptions

  const _bootParams: BootParams = bootParams ?? createBootParams(vue, appOptions)

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

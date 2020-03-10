import routes from 'src/router/routes'
import store from 'src/store'
import {BootFileFunction} from 'src/types'
import {BootParams, createBootParams} from './create-boot-params'
import Vue from 'vue'

interface BootResult {
  context: BootParams,
  results: any[]
}

/**
 * boot function test helper
 * @param boots what boot function you want to test
 * @param vue
 * @param bootParams
 */
export const boot = async (
  boots: BootFileFunction[],
  vue: typeof Vue = Vue,
  bootParams?: BootParams,
): Promise<BootResult> => {

  const _bootParams: BootParams = bootParams ?? createBootParams(vue, {
    store: (Vue) => (store({Vue})),
    router: {
      mode: 'abstract',
      routes,
    },
  })

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

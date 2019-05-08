import {Builder, Nuxt} from 'nuxt'
import 'tsconfig-paths/register'
import MochaWatch from '../build/mocha'
import {DoubleShot, getTestNuxtConfig} from '../build/utils'

const config: any = {}

const {
  port,
  configFile = './nuxt.config.ts',
  host = 'localhost',
  watch = ['./test/**/*.(tsx?|jsx?|vue)'],
  test = ['./test/**/*.spec.ts'],
} = config

const cwd = process.cwd()
let nuxt

getTestNuxtConfig(cwd, configFile, [...watch, ...test]).then((nuxtConfig) => {
  if(!nuxtConfig.build){
    nuxtConfig.build = {}
  }
  const {build} = nuxtConfig
  build.useForkTsChecker = false
  nuxt = new Nuxt(nuxtConfig)
  const mochaWatch = new MochaWatch({
    include: test,
  })

  const doubleShot = new DoubleShot(() => {
    console.log('build:compiled')
    mochaWatch.rerun()
  })
  nuxt.hook('build:compiled', (builder: any, ...args: any[]) => {
    doubleShot.tryRun(builder.name, [builder, ...args])
  })
  return new Builder(nuxt).build()
})
.then(() => nuxt.listen(port, host))
.then(() => console.log('server is loaded'))

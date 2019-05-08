import {join} from 'path'

export const getTestNuxtConfig = async (
  projectRoot: string,
  configFile: string,
  watch: string[] = [],
) => {
  let nuxtConfig: any = await import(join(projectRoot, configFile))
  nuxtConfig = nuxtConfig.default || nuxtConfig || {}
  nuxtConfig = typeof nuxtConfig === 'function' ? nuxtConfig() : nuxtConfig

  nuxtConfig.dev = true
  nuxtConfig.build = {
    ...nuxtConfig.build,
    ssr: true,
  }
  nuxtConfig.watch = [...nuxtConfig.watch, ...watch]
  return nuxtConfig
}

type DoubleShotCallback = (...args: any[]) => any

export class DoubleShot {
  private _server: boolean
  private _client: boolean
  private readonly _cb: DoubleShotCallback
  constructor(cb: DoubleShotCallback) {
    this._cb = cb
    this._server = false
    this._client = false
  }
  tryRun(kind: 'server' | 'client', ...args: any[]) {
    switch(kind){
      case 'server':
        this._server = true
        break
      case 'client':
        this._client = true
        break
      // no default
    }
    if(this._client && this._server){
      this._server = false
      this._client = false
      this._cb(...args)
    }
  }
}

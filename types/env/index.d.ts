
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    readonly VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    readonly VUE_ROUTER_BASE: string | undefined
    readonly VUE_PAGES_PATH: string
    readonly WEBPACK_SRC_ALIAS: string
    readonly VUE_MIDDLEWARE_PATH: string
  }
}


declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    readonly VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract'
    readonly VUE_PAGES_PATH: string
    readonly VUE_LAYOUT_PATH: string
    readonly VUE_MIDDLEWARE_PATH: string

    readonly WEBPACK_SRC_ALIAS: string
    readonly WEBPACK_TSCONFIG: string
  }
}

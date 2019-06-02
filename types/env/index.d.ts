/* tslint:disable:no-namespace */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    readonly VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract'
    readonly VUE_PAGES_PATH: string
    readonly VUE_LAYOUTS_PATH: string
    readonly VUE_MIDDLEWARE_PATH: string

    readonly WEBPACK_SRC_ALIAS: string
    readonly WEBPACK_TSCONFIG: string
    readonly WEBPACK_TSLINT: string

    readonly FIREBASE_API_KEY: string
    readonly FIREBASE_AUTH_DOMAIN: string
    readonly FIREBASE_DATABASE_URL: string
    readonly FIREBASE_PROJECT_ID: string
    readonly FIREBASE_STORAGE_BUCKET: string
    readonly FIREBASE_MESSAGING_SENDER_ID: string
    readonly FIREBASE_API_ID: string
  }
}

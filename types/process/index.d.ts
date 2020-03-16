/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 */
declare namespace NodeJS {
  interface Process {
    client: boolean
    server: boolean
    browser: boolean
    BROWSER_BUILD: boolean
  }

  interface ProcessEnv {
    NODE_ENV: string
    DEV: boolean

    // quasar (vue)
    VUE_ROUTER_MODE?: 'hash' | 'history' | 'abstract'
    VUE_ROUTER_BASE?: string

    // google map
    VUE_GOOGLE_MAPS_API_KEY: string

    // firebase
    VUE_FIREBASE_API_KEY: string
    VUE_FIREBASE_PROJECT_ID: string
    VUE_FIREBASE_MESSAGING_SENDER_ID: string
    VUE_FIREBASE_API_ID: string

    // project version
    VERSION: string
  }
}


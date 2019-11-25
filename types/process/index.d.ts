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

    // quasar (vue)
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined

    // firebase
    FIREBASE_API_KEY: string
    FIREBASE_AUTH_DOMAIN: string
    FIREBASE_DATABASE_URL: string
    FIREBASE_PROJECT_ID: string
    FIREBASE_STORAGE_BUCKET: string
    FIREBASE_MESSAGING_SENDER_ID: string
    FIREBASE_API_ID: string
  }
}


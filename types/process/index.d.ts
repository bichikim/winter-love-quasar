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
    VUE_GOOGLE_MAPS_API_KEY: string

    // firebase
    FIREBASE_API_KEY: string
    FIREBASE_AUTH_DOMAIN: string
    FIREBASE_DATABASE_URL: string
    FIREBASE_PROJECT_ID: string
    FIREBASE_STORAGE_BUCKET: string
    FIREBASE_MESSAGING_SENDER_ID: string
    FIREBASE_API_ID: string

    /**
     * Test env only
     **/
    // karma
    KARMA_WITH_FIREBASE?: 'true' | 'false'
  }
}


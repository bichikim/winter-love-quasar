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
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
    API_URL: string
  }
}


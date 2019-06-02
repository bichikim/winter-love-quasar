import dotenv from 'dotenv'
import {version} from '../package.json'

export default (path?: string): NodeJS.ProcessEnv => {
  const env = dotenv.config({path}).parsed || {}
  return {
    PRODUCT_NAME: 'winter-love',
    PROJECT_VERSION: version,
    VUE_LAYOUTS_PATH: 'layouts',
    VUE_MIDDLEWARE_PATH: 'middleware',
    VUE_PAGES_PATH: 'pages',
    VUE_ROUTER_MODE: 'history',
    WEBPACK_SRC_ALIAS: '@',
    WEBPACK_TSCONFIG: 'tsconfig.json',
    WEBPACK_TSLINT: 'tslint.json',
    FIREBASE_API_KEY: 'AIzaSyCzNb_FV1ySi_4Hms9MsucvMcuELGVUnBI',
    FIREBASE_AUTH_DOMAIN: 'winter-lover.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://winter-lover.firebaseio.com',
    FIREBASE_PROJECT_ID: 'winter-lover',
    FIREBASE_STORAGE_BUCKET: 'winter-lover.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '353016949858',
    FIREBASE_API_ID: '1:353016949858:web:2fb7a19f64d4304d',
    ...env as any,
  }
}

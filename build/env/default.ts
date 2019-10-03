import {version} from '../../package.json'

export default {
  // project env
  PRODUCT_NAME: 'Keep',
  PRODUCT_VERSION: version,

  // vue env
  // VUE_LAYOUTS_PATH: 'layouts',
  VUE_MIDDLEWARE_PATH: 'middleware',
  VUE_PAGES_PATH: 'pages',
  VUE_ROUTER_MODE: 'history',

  // webpack env
  WEBPACK_SRC_ALIAS: '@',
  WEBPACK_TSCONFIG: 'tsconfig.bundle.json',
  WEBPACK_TSLINT: 'tslint.json',

  KARMA_SNAPSHOT_PATH: '.snapshots',

  // API
  API_BASE_URL: 'https://demo.com',

  API: 'mock',
}

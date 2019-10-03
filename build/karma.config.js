/**
 * Karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * (mocha, chai, karma-coverage)
 * @author BichiKim <bichi@live.co.kr, bichi@neillab.com>
 */
process.env.NODE_ENV='test'
require('./ts-register')
const {default: addBaseWebpack, envJsonStringify} = require('./add-base-webpack.ts')
const path = require('path')
const env = require('./env.ts').default()
const {join} = require('path')

/**
 * Additional webpack config for testing
 */
const webpack = {
  mode: 'development',
  devtool: 'inline-source-map',
}

/**
 * Generate webpack config
 */
addBaseWebpack(webpack, {
  tsconfigPath: env.WEBPACK_TSCONFIG,
  srcAlias: env.WEBPACK_SRC_ALIAS,
  eslint: true,
  transpileOnly: true,
  middlewarePath: '../test/mock/middleware',
  stylus: true,
  fileLoader: true,
  tslintPath: env.WEBPACK_TSLINT,
  additionalAlias: true,
  vue: true,
  env: envJsonStringify({
    env,
    'API': 'local',
    'TEST': 'true',
  }, true),
})

module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    frameworks: ['mocha', 'chai', 'snapshot', 'mocha-snapshot'],
    reporters: ['mocha', 'coverage-istanbul'],
    files: [
      // to read karma snapshot save files
      `${env.KARMA_SNAPSHOT_PATH}/**/*.md`,
      // to add polyfills before running tests
      'build/karma.polyfill.ts',
      'test/karma/**/*.spec.ts',
      // add all files in assets
      'src/assets/**/*',
    ],
    exclude: [
      './**/*.spec.skip.js',
      './**/*.spec.skip.ts',
    ],
    preprocessors: {
      // to read karma snapshot save files
      [`${env.KARMA_SNAPSHOT_PATH}/**/*.md`]: ['snapshot'],
      'build/**/*.js': ['webpack'],
      'build/**/*.ts': ['webpack'],
      'test/karma/**/*.spec.js': ['webpack', 'sourcemap'],
      'test/karma/**/*.spec.ts': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      // This is for Webstrom coverage reporter
      // Karma coverage won't use this
      dir: '.coverage',
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(process.cwd(), '.coverage'),
      fixWebpackSourcePaths: true,
    },
    // fix url path
    proxies: {
      // fix assets path
      '/assets/': '/base/src/assets/',
    },
    webpack,
    webpackMiddleware: {
      stats: 'errors-only',
      logLevel: 'silent',
      noInfo: true,
    },
    // karma snapshot config
    snapshot: {
      update: Boolean(process.env.UPDATE),
      prune: Boolean(process.env.PRUNE),
      pathResolver: (basePath, suiteName) =>
        (join(basePath, env.KARMA_SNAPSHOT_PATH, `${suiteName}.md`)),
    },
    // enable / disable colors in the output (reporters and logs)
    autoWatch: true,
    logLevel: config.LOG_INFO,
    colors: true,
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security'],
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ],
      },
      ChromeHeadlessWithoutSecurity: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security'],
      },
    },
    mime: {
      'text/x-typescript': ['ts' ,'tsx'],
    },
  })
}

/**
 * Karma settings
 * @author BichiKim <bichi@live.co.kr>
 */

process.env.NODE_ENV = 'test'

// to fix webstorm ts-node error
process.env.TS_NODE_PROJECT = null

const {join} = require('path')
const quasarChainConfig = require('./build/webpack.quasar.js')

// get quasar webpack config
const webpack = quasarChainConfig('test').toConfig()

// karma config
module.exports = function config(config) {

  config.set({
    basePath: './',
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha', 'coverage-istanbul'],
    files: [
      // to add polyfills before running tests
      'test/src/karma.polyfill.ts',
      'test/src/**/*.spec.ts',
      // add all files in assets
      'src/assets/**/*',
    ],
    exclude: [
      './**/*.spec.skip.js',
      './**/*.spec.skip.ts',
    ],
    preprocessors: {
      '**/*.ts': ['webpack'],
      'test/quasar/**/*.spec.js': ['webpack', 'sourcemap'],
      'test/quasar/**/*.spec.ts': ['webpack', 'sourcemap'],
    },
    coverageReporter: {
      // This is for Webstrom coverage reporter
      // Karma coverage won't use this
      dir: '.coverage',
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: join(__dirname, '.coverage'),
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
        flags: ['-headless'],
      },
      ChromeHeadlessWithoutSecurity: {
        base: 'ChromeHeadless',
        flags: ['--disable-web-security'],
      },
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
  })
}

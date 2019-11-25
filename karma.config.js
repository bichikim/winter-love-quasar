/**
 * Karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * (mocha, chai, karma-coverage)
 * @author BichiKim <bichi@live.co.kr>
 */
const {join} = require('path')
const quasarChainConfig = require('./webpack.quasar')
const webpack = quasarChainConfig().toConfig()
const firebase = require('@firebase/testing')
const fs = require('fs')

firebase.initializeTestApp({
  projectId: 'winter-love',
  auth: {uid: 'test', email: 'test@test.com'},
})

firebase.loadDatabaseRules({
  databaseName: 'winter-love',
  rules: fs.readFileSync('./firestore.rules'),
})

process.env.NODE_ENV = 'test'
module.exports = function config(config) {
  config.set({
    basePath: './',
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha', 'coverage-istanbul'],
    files: [
      // to add polyfills before running tests
      'test/karma.polyfill.ts',
      'test/karma/**/*.spec.ts',
      // add all files in assets
      'src/assets/**/*',
    ],
    exclude: [
      './**/*.spec.skip.js',
      './**/*.spec.skip.ts',
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack'],
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

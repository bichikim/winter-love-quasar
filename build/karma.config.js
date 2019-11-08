/**
 * Karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * (mocha, chai, karma-coverage)
 * @author BichiKim <bichi@live.co.kr, bichi@neillab.com>
 */
process.env.NODE_ENV='test'
require('./ts-register')
const quasarConfig = require('../quasar.conf.js')
const quasarWebpack = require('@quasar/app/lib/webpack')
const {join} = require('path')


module.exports = async function (config) {
  const webpack = await quasarWebpack({
    ctx: {
      dev: true,
      mode: {
        spa: true,
      },
    },
    build: {},
    __html: {},
    ...quasarConfig(),
  })

  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai'],
    reporters: ['spec','coverage-istanbul'],
    files: [
      // to add polyfills before running tests
      'build/karma.polyfill.ts',
      'test/spec/**/*.spec.ts',
    ],
    exclude: [
      './**/*.spec.skip.js',
      './**/*.spec.skip.ts',
    ],
    preprocessors: {
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
      dir: join(process.cwd(), '.coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
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

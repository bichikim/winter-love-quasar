/**
 * Karma settings
 * This test must have packages below
 * karma, karma-chai, karma-sourcemap-loader, karma-spec-reporter, karma-webpack
 * (mocha, chai, karma-coverage)
 * @author BichiKim <bichi@live.co.kr, bichi@neillab.com>
 */
require('./ts-register')
const {default: addBaseWebpack, envJsonStringify} = require('./add-base-webpack.ts')
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
  eslint: true,
  transpileOnly: true,
  stylus: true,
  fileLoader: true,
  additionalAlias: true,
  vue: true,
  env: envJsonStringify({
    'API': 'local',
    'TEST': 'true',
  }, true),
})

module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha', 'coverage-istanbul'],
    files: [
      // to add polyfills before running tests
      'config/karma.polyfill.ts',
      'test/karma/**/*.spec.ts',
      // add all files in assets
      'src/assets/**/*',
    ],
    exclude: [
      './**/*.spec.skip.js',
      './**/*.spec.skip.ts',
    ],
    preprocessors: {
      'config/**/*.js': ['webpack'],
      'config/**/*.ts': ['webpack'],
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

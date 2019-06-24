require('./ts-env-register')
const nodeExternals = require('webpack-node-externals')
const addBaseWebpack = require('./add-base-webpack').default
const _env = require('./env').default

const env = _env()

const config = {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
}

addBaseWebpack(config, {
  tsconfigPath: env.WEBPACK_TSCONFIG,
  aliasSrc: env.WEBPACK_SRC_ALIAS,
  eslint: false,
  transpileOnly: true,
  tslintPath: env.WEBPACK_TSLINT,
  pagePath: env.VUE_PAGES_PATH,
  stylus: true,
  vue: true,
})

module.exports = config

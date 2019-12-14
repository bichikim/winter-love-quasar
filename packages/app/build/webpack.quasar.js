const createChain = require('@quasar/app/lib/webpack/create-chain')
const quasarConfig = require('../quasar.conf')
const spa = require('@quasar/app/lib/webpack/spa')
const {jsConfig} = require('./webpack.chain')

const defaultQuasarConfig = {
  ctx: {dev: true, mode: {spa: true}},
  css: [], boot: [],
  vendor: {add: [], remove: []},
  build: {
    sourceMap: 'eval',
    transpileDependencies: [],
    stylusLoaderOptions: {},
    sassLoaderOptions: {},
    scssLoaderOptions: {},
    lessLoaderOptions: {},
    env: {},
    uglifyOptions: {
      compress: {},
      mangle: {},
    },
  },
  devServer: {},
  animations: [],
  extras: [],
  sourceFiles: {
    indexHtmlTemplate: 'src/index.template.html',
  },
  ssr: {
    componentCache: {},
  },
  pwa: {
    workboxOptions: {},
    manifest: {
      icons: [],
    },
    metaVariables: {},
  },
  electron: {
    packager: {},
    builder: {},
  },
  cordova: {},
  capacitor: {},
  bin: {},
  htmlVariables: {},
  framework: {
    all: true,
  },
  __html: {
    variables: {},
  },
}

module.exports = function quasarChainConfig(mode) {

  const _quasarConfig = quasarConfig({
    mode,
  })
  const config = {...defaultQuasarConfig, ..._quasarConfig}
  const quasarConfigChain = createChain(config, 'SPA')
  const {chainWebpack} = _quasarConfig.build
  if(chainWebpack) {
    chainWebpack(quasarConfigChain)
  }

  spa(quasarConfigChain, config)

  quasarConfigChain.optimization.clear()
  quasarConfigChain.module.rules.delete('babel')
  jsConfig(quasarConfigChain)

  return quasarConfigChain
}

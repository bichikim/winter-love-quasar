const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {resolve} = require('path')

function tsConfig(config, ctx) {
  const {dev = true} = ctx || {}
  config.resolve.extensions.add('.ts').add('.tsx')
  config.module.rule('ts')
  .test(/\.tsx?$/)
  .use('babel').loader('babel-loader').end()
  .use('ts').loader('ts-loader').options({
    appendTsSuffixTo: [/\.vue$/],
    transpileOnly: dev,
    configFile: 'tsconfig.json',
  }).end()
  if(dev) {
    config.plugin('ts-checker')
    .use(ForkTsCheckerWebpackPlugin, [{vue: true, eslint: true}])
  }
  return config
}

function pugConfig(config) {
  config.module.rule('pug')
  .test(/\.pug$/)
  .oneOf('vue-loader')
  .resourceQuery(/^\?vue/)
  .use('pug-plain')
  .loader('pug-plain-loader')
  .end()
  .end()


  .oneOf('raw-pug')
  .use('pug')
  .loader('pug-loader')
  .end()
  .end()
  return config
}

function jsConfig(config) {
  config.resolve.extensions.add('.js').add('.jsx')
  config.module.rule('js')
  .test(/\.jsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  return config
}

function aliasConfig(config) {
  config.resolve.alias.set('@', resolve('src'))
  config.resolve.alias.set('@@', resolve(''))
  config.resolve.alias.set('layouts', resolve('src', 'layouts'))
  config.resolve.alias.set('components', resolve('src', 'components'))
  config.resolve.alias.set('pages', resolve('src', 'pages'))
  config.resolve.alias.set('assets', resolve('src', 'assets'))
  return config
}

function vueConfig(config, plugin = true) {
  config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')

  config.resolve.extensions.add('.vue')
  config.module.rule('vue')
  .test(/\.vue$/)
  .use('vue')
  .loader('vue-loader')
  if(plugin) {
    config.plugin('vue').use(VueLoaderPlugin)
  }

  return config
}

function stylusConfig(config) {
  config.resolve.extensions.add('.styl').add('stylus')
  config.module.rule('stylus')
  .test(/\.styl(us)?$/)
  .use('vue-style')
  .loader('vue-style-loader')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('stylus')
  .loader('stylus-loader')
  .end()
  .end()
  return config
}

function imgConfig(config) {
  config.module.rule('img-file')
  .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  .use('file')
  .loader('file-loader')
  return config
}

function envReader(env, addPrefix = false) {
  const stringifyEnv = {}
  const prefix = addPrefix ? 'process.env.' : ''
  Object.keys(env).forEach((key) => {
    const value = env[key]
    const name = key.toUpperCase()
    stringifyEnv[`${prefix}${name}`] = JSON.stringify(value)
  })
  return stringifyEnv
}

// noinspection WebpackConfigHighlighting
module.exports = {
  tsConfig, pugConfig, jsConfig, vueConfig, stylusConfig, imgConfig, envReader, aliasConfig,
}

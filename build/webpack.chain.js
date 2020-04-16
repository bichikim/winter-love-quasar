const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const Eslint = require('eslint')

function resolve(...args) {
  return path.join(__dirname, '../', ...args)
}

/**
 * typescript building setting
 * @param config
 * @param ctx
 */
function tsConfig(config, ctx) {
  const {dev = true} = ctx || {}
  config.resolve.extensions.add('.ts').add('.tsx')
  config.module.rule('babel-ts')
        .test(/\.tsx?$/)
        .use('babel').loader('babel-loader')
        .options({
          compact: false,
          extends: path.resolve(__dirname, '..', 'babel.config.js'),
        })
        .end()

  if(dev) {
    config.plugin('ts-checker')
          .use(ForkTsCheckerWebpackPlugin, [
            {
              vue: true,
              eslint: true,
              tsconfig: 'tsconfig.bundle.json',
            }])
  }
  return config
}

/**
 * pug building setting
 * @param config
 * @returns {*}
 */
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

/**
 * javascript building setting
 * @param config
 * @returns {*}
 */
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

/**
 * webpack alias setting
 * @param config
 * @returns {*}
 */
function aliasConfig(config) {
  config.resolve.alias.set('src', resolve('src'))
  config.resolve.alias.set('test', resolve('test'))
  config.resolve.alias.set('build', resolve('build'))
  config.resolve.alias.set('layouts', resolve('src', 'layouts'))
  config.resolve.alias.set('components', resolve('src', 'components'))
  config.resolve.alias.set('pages', resolve('src', 'pages'))
  config.resolve.alias.set('boot', resolve('src', 'boot'))
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

/**
 * stylus config
 * @param config
 * @return {*}
 */
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

function eslint(config) {
  config.module.rule('eslint')
        .enforce('pre')
        .test(/\.(js|vue)$/)
        .exclude.add(/node_modules/).end()
        .use('eslint').loader('eslint-loader')
        .options({
          formatter: Eslint.CLIEngine.getFormatter('stylish'),
        })
        .end()
}

/**
 * Add file-loader for image files
 * @param config
 * @return {*}
 */
function imgConfig(config) {
  config.module.rule('img-file')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('file')
        .loader('file-loader')
  return config
}

/**
 * Add webfonts-loader
 * @param config webpack chain config
 * @param options
 */
function iconFont(config, options = {}) {
  const {
    match = /\.font\.js$/,
    extract = true,
  } = options
  config.module.rule('icon-font')
        .test(match)
        .use('style')
  .when(
    extract,
    (use) => {
      use.loader(MiniCssExtractPlugin.loader)
    },
    (use) => {
      use.loader('style-loader')
    },
  )
        .end()
        .use('css')
        .loader('css-loader')
        .end()
        .use('webfonts')
        .loader('webfonts-loader')
        .options({
          publicPath: '/',
        })
        .end()
        .end()
}

/**
 * Add i18n
 * @param config
 */
function i18n(config) {
  config.module
        .rule('i18n')
        .resourceQuery(/blockType=i18n/)
        .type('javascript/auto')
        .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end()
}

function preload(config) {
  config.plugin('preload-webpack')
  .after('html-webpack')
  .use(PreloadWebpackPlugin, [{
      rel: 'preload',
  }])
}

function copy(config) {
  config.plugin('copy-webpack')
    .tap((args) => {
      const [arg = [], ...others] = args
      return [[
        ...arg,
        {from: path.join(__dirname, '..', 'src/robots.txt'), to: 'robots.txt'},
      ], ...others]
  })

}

// noinspection WebpackConfigHighlighting
module.exports = {
  tsConfig, pugConfig, jsConfig, vueConfig, stylusConfig, imgConfig, aliasConfig,
  iconFont, i18n, eslint, preload, copy,
}

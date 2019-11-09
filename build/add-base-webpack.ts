import CopyPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {chain, forEach} from 'lodash'
import {resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
// import VueAutoRoutingPlugin from 'vue-auto-routing/lib/webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import {Configuration, DefinePlugin, Module, Plugin, Resolve} from 'webpack'

/**
 * Fill all empty filed
 * @param config
 */
export const makeSureConfig = (config: Configuration) => {
  if(!config.resolve) {
    config.resolve = {}
  }
  if(!config.resolve.alias) {
    config.resolve.alias = {}
  }
  if(!config.resolve.plugins) {
    config.resolve.plugins = []
  }
  if(!config.resolve.extensions) {
    config.resolve.extensions = []
  }
  if(!config.module) {
    config.module = {
      rules: [],
    }
  }
  if(!config.plugins) {
    config.plugins = []
  }
}

export interface RequiredConfiguration extends Configuration {
  resolve: Required<Resolve>
  module: Module
  plugins: Plugin[]
}

export interface CoryFileFromOptions {
  glob: string
  dot?: boolean
}

export interface CopyFilesPatterns {
  from: string | CoryFileFromOptions
  to: string
  toType?: 'file' | 'dir' | 'template'
  test?: RegExp,
  force?: boolean,
  ignore?: string[]
  /**
   * @default false
   */
  flatten?: boolean
  /**
   * @default false
   */
  cache?: boolean
  transform?: (content: any, path: string) => any
  transformPath?: (targetPath: string, absolutePath: string) => string
}

export interface CopyFilesOptions {
  /**
   * @default 'warn'
   */
  logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  ignore?: string[]
  context?: string
  copyUnmodified?: boolean
}

/**
 * Add base webpack options
 */
export interface Options {
  tsconfigPath: string
  tslintPath?: string
  transpileOnly: boolean
  pagePath?: string
  sourcePath?: string
  middlewarePath?: string
  middlewareAlias?: string
  srcAlias?: string
  rootAlias?: string
  stylus?: boolean
  eslint?: boolean
  fileLoader?: boolean
  eslintCache?: boolean
  additionalAlias?: boolean
  copyFiles?: CopyFilesPatterns[]
  env?: any
  vue: boolean
}

/**
 * Transform object value into JSON.stringify value
 * @param env an object for env data
 * @param addPrefix result is 'process.env.[key]: value'
 */
export const envJsonStringify = <E>(env: { [key: string]: any }, addPrefix: boolean = false): E => {
  const stringifyEnv: any = {}
  const prefix = addPrefix ? 'process.env.' : ''
  forEach(env, (value, key) => {
    const name = chain(key).snakeCase().toUpper().value()
    stringifyEnv[`${prefix}${name}`] = JSON.stringify(value)
  })
  return stringifyEnv
}

/**
 * Base webpack config factory
 * @param _config
 * @param options
 */
export default (_config: Configuration, options: Options) => {
  const {
    tsconfigPath,
    pagePath,
    transpileOnly,
    stylus,
    sourcePath = 'src',
    middlewarePath = 'middleware',
    tslintPath,
    srcAlias = '@',
    // rootAlias = '@@',
    eslint,
    eslintCache = false,
    copyFiles,
    fileLoader = false,
    additionalAlias = false,
    env,
    vue,
  } = options
  makeSureConfig(_config)
  const config: RequiredConfiguration = _config as RequiredConfiguration
  if(additionalAlias) {
    config.resolve.alias.layouts = resolve(sourcePath, 'layouts')
    config.resolve.alias.components = resolve(sourcePath, 'components')
    config.resolve.alias.pages = resolve(sourcePath, 'pages')
    config.resolve.alias.assets = resolve(sourcePath, 'assets')
    config.resolve.alias.src = resolve(sourcePath)
  }
  config.resolve.alias[srcAlias] = resolve(sourcePath)
  // tslint:disable-next-line: no-string-literal
  config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
  config.resolve.extensions.push(...[
    '.js', '.jsx', '.mjs', '.json',
    '.ts', '.tsx', '.vue', '.stylus', 'styl',
  ])
  config.resolve.plugins.push(new TsconfigPathsWebpackPlugin({
    configFile: tsconfigPath,
  }))
  config.plugins.push(new DefinePlugin({
    'process.env.VUE_MIDDLEWARE_RESOLVE_PATH': JSON.stringify(resolve(sourcePath, middlewarePath)),
  }))
  if(env) {
    config.plugins.push(new DefinePlugin(env))
  }

  config.module.rules.push(...
    [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly,
              configFile: tsconfigPath,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        exclude: [/node_modules/],
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['pug-loader'],
          },
        ],
      },
    ],
  )

  // Set vue loader
  if(vue) {
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
      // exclude: [/node_modules/],
    })
    config.plugins.push(...[
      new VueLoaderPlugin(),
    ])
  }

  if(fileLoader) {
    config.module.rules.push(...[
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ])
  }

  // Set stylus loader
  if(stylus) {
    config.module.rules.push(
      {
        test: /\.styl(us)?$/,
        exclude: [/node_modules/],
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              import: [resolve(sourcePath, 'css/quasar.variables.styl')],
            },
          },
        ],
      },
    )
  }

  // Set auto routing pages
  // if(pagePath) {
  //   config.plugins.push(
  //     new VueAutoRoutingPlugin({
  //       pages: resolve(sourcePath, pagePath),
  //       importPrefix: `${srcAlias}/${pagePath}/`,
  //     }),
  //   )
  // }

  if(copyFiles) {
    config.plugins.push(
      new CopyPlugin(copyFiles),
    )
  }

  // Set transpileOnly
  if(transpileOnly) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      tslint: tslintPath && resolve(tslintPath),
      vue: true,
    }))
  }

  // add eslint checking
  if(eslint) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: [/node_modules/],
      options: {
        cache: eslintCache,
      },
    })
  }

}

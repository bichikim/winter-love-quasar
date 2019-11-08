import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {chain, forEach} from 'lodash'
import {resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
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
  sourcePath?: string
  middlewarePath?: string
  srcAlias?: string
  additionalAlias?: boolean
  env?: any
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
    tsconfigPath = 'tsconfig.json',
    transpileOnly = true,
    sourcePath = 'src',
    middlewarePath = 'middleware',
    srcAlias = '@',
    additionalAlias = false,
    env,
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

  // Set transpileOnly
  if(transpileOnly) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      vue: true,
    }))
  }
}

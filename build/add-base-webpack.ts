import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {chain, forEach} from 'lodash'
import {resolve} from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'
import VueAutoRoutingPlugin from 'vue-auto-routing/lib/webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import {Configuration, Module, Plugin, Resolve} from 'webpack'

export const makeSureConfig = (config: Configuration) => {
  if(!config.resolve){
    config.resolve = {}
  }
  if(!config.resolve.alias){
    config.resolve.alias = {}
  }
  if(!config.resolve.plugins){
    config.resolve.plugins = []
  }
  if(!config.resolve.extensions){
    config.resolve.extensions = []
  }
  if(!config.module){
    config.module = {
      rules: [],
    }
  }
  if(!config.plugins){
    config.plugins = []
  }
}

export interface RequiredConfiguration extends Configuration{
  resolve: Required<Resolve>
  module: Module
  plugins: Plugin[]
}

export interface Options {
  tsconfigPath: string
  tslintPath: string
  transpileOnly: boolean
  pagePath?: string
  sourcePath?: string
  aliasSrc: string
  stylus: boolean
  eslint: boolean
  vue: boolean
}

export const envJsonStringify = <E>(env: {[key: string]: any}): E => {
  const stringifiedEnv: any = {}
  forEach(env, (value, key) => {
    stringifiedEnv[chain(key).snakeCase().toUpper().value()] = JSON.stringify(value)
  })
  return stringifiedEnv
}

export default (_config: Configuration, options: Options) => {
  const {
    tsconfigPath,
    pagePath,
    transpileOnly,
    stylus,
    sourcePath = 'src',
    tslintPath,
    aliasSrc,
    eslint,
    vue,
  } = options
  makeSureConfig(_config)
  const config: RequiredConfiguration = _config as RequiredConfiguration
  config.resolve.alias[aliasSrc] = resolve('src')
   // tslint:disable-next-line: no-string-literal
  config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
  config.resolve.extensions.push(...[
    '.js', '.jsx', '.mjs', '.json',
    '.ts', '.tsx', '.vue', '.stylus', 'styl',
  ])
  config.resolve.plugins.push(new TsconfigPathsWebpackPlugin({
    configFile: tsconfigPath,
  }))
  config.module.rules.push(...[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
  if(vue){
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    })
    config.plugins.push(...[
      new VueLoaderPlugin(),
    ])
  }
  if(stylus){
    config.module.rules.push(
      {
        test: /\.styl(us)?$/,
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
  if(pagePath){
    config.plugins.push(
      new VueAutoRoutingPlugin({
        pages: resolve(sourcePath, pagePath),
        importPrefix: `${aliasSrc}/${pagePath}/`,
      }),
    )
  }
  if(transpileOnly){
    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigPath,
      tslint: resolve(tslintPath),
      vue: true,
    }))
  }
  if(eslint){
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    })
  }

}

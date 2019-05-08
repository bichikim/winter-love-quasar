import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpack from 'webpack'
export default function(options = {}) {
  const {
    configFile = 'tsconfig.json',
    babel = {
      presets: ['@nuxt/babel-preset-app'],
    },
  } = options

  return function(config, {isDev}) {
    const tsLoader = {
      // refer to https://github.com/nuxt/nuxt.js/issues/3164
      exclude: [/node_modules/, /vendor/, /dist/],
      use: [
        // go throw babel-loader after ts-loader
        {
          loader: 'babel-loader',
          options: babel,
        },
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            // refer to https://github.com/nuxt/nuxt.js/issues/3164
            configFile,
            transpileOnly: isDev,
            silent: true,
          },
        },
      ],
    }

    // Add TypeScript loader
    config.module.rules.push({
      // test: /((client|server)\.js)|(\.tsx?)$/,
      test: /\.tsx?$/,
      ...tsLoader,
    })
    if(isDev){
      config.devtool = 'inline-source-map'
    }
    // Add TypeScript loader for vue files
    for(let rule of config.module.rules){
      if(rule.loader === 'vue-loader'){
        if(!rule.options.loaders){
          rule.options.loaders = {}
        }
        rule.options.loaders.ts = tsLoader
      }
    }
    // Add .ts extension in webpack resolve
    if(config.resolve.extensions.indexOf('.ts') === -1){
      config.resolve.extensions.push('.ts')
    }
    if(config.resolve.extensions.indexOf('.tsx') === -1){
      config.resolve.extensions.push('.tsx')
    }

    if(isDev){
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          checkSyntacticErrors: true,
          tslint: true,
          vue: true,
          watch: 'src',
          silent: true,
        }),
      )
      config.plugins.push(new webpack.WatchIgnorePlugin(['src/**/*.js', /\.d\.ts$/]))
    }
  }
}

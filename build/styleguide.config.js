const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {resolve} = require('path')
module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    if(!webpackConfig.resolve.plugins){
      webpackConfig.resolve.plugins = []
    }
    webpackConfig.resolve.alias['~'] = resolve('src')
    webpackConfig.resolve.alias['@'] = resolve('src')
    return webpackConfig
  },
  components: [
    resolve('src/components/**/*.vue'),
  ],
  styleguideDir: resolve('./.styleguide'),
  require: [
    resolve('./build/styleguide-require.js'),
  ],
  webpackConfig: {
    resolve: {
      extensions: [
        '.js', '.jsx', '.mjs', '.json',
        '.ts', '.tsx', '.vue', '.stylus', 'styl'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                // import: [resolve('src/assets/styles/variables.styl')],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@quasar/babel-preset-app'],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                configFile: 'tsconfig.json',
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader',
        },
      ],
    },
    plugins: [
      // make sure to include the plugin!
      new VueLoaderPlugin(),
    ],
  },
}

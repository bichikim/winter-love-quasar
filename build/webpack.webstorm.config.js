const path = require('path')

/**
 * Webpack setting For WebStorm IDE
 * read this file form webstrom -> setting -> Languages & Frameworks -> JavaScript -> Webpack
 */
module.exports = {
  resolve: {
    extensions: [
      '.js', '.jsx', '.mjs', '.json', '.ts', '.tsx', '.vue', '.stylus', 'styl',
    ],
    alias: {
      'layouts': path.resolve(__dirname, '../src', 'layouts'),
      'components': path.resolve(__dirname, '../src', 'components'),
      'pages': path.resolve(__dirname, '../src', 'pages'),
      'assets': path.resolve(__dirname, '../src', 'assets'),
      'boot': path.resolve(__dirname, '../src', 'boot'),
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
}

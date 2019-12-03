/* istanbul ignore file no way to test */
const path = require('path')

/**
 * For WebStorm IDE
 */
module.exports = {
  resolve: {
    extensions: [
      '.js', '.jsx', '.mjs', '.json', '.ts', '.tsx', '.vue', '.stylus', 'styl',
    ],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '~': path.resolve(__dirname, '../src/'),
      'img': path.resolve(__dirname, '../src/assets/img'),
      'css': path.resolve(__dirname, '../src/css'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
}

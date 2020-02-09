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
      '@': path.join(__dirname, '../src/'),
      '~': path.join(__dirname, '../src/'),
      'img': path.join(__dirname, '../src/assets/img'),
      'pages': path.join(__dirname, '../src/pages'),
      'layouts': path.join(__dirname, '../src/layouts'),
      'css': path.join(__dirname, '../src/css'),
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
}

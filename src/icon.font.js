/**
 * Generates icon font from owr keep SVG
 * @link https://www.npmjs.com/package/webfonts-loader
 */
module.exports = {
  /**
   * Files path
   */
  'files': [
    './icons/**/*.svg',
  ],
  /**
   * A generated font name
   */
  'fontName': 'svg-icon',
  /**
   *
   */
  'classPrefix': 'icon-',
  'baseSelector': '.icon',
  'types': ['eot', 'woff', 'woff2', 'ttf', 'svg'],
  'fixedWidth': true,
  'fileName': '[fontname].[chunkhash].[ext]',
}

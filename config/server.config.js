/**
 * Lite Server config
 * for looking up build bundle file running
 * @link https://www.npmjs.com/package/lite-server
 */
module.exports = {
  port: 8000,
  files: ['./dist/spa/**/*.{html, css, js, png}'],
  server: {baseDir: './dist/spa'},
}

/* eslint-disable consistent-this */
// Content Security Policy
const csp = require('helmet-csp')

const self = '\'self\''

const scripts = [
  // google map
  'https://maps.googleapis.com/',
  // google analytics
  'https://www.google-analytics.com/',
]

const images = [
  'https:',
  'data:',
]

const fonts = [
  // google fonts
  'https://fonts.gstatic.com/',
]

const styles = [
  // google fonts
  'https://fonts.googleapis.com/',
]

module.exports = csp({
  directives: {
    defaultSrc: [self],
    scriptSrc: [self, ...scripts],
    imgSrc: [self, ...images],
    fontSrc: [self, ...fonts],
    styleSrc: [self, ...styles],
    // breaks pdf in chrome:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=413851
    sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
  },
})

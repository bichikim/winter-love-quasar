/**
 * Setting before karma is ran
 */
/* eslint-disable no-console,camelcase */
/* istanbul ignore file It cannot be tested because It is polyfills*/
import {expect, use} from 'chai'
import {matchSnapshot} from 'chai-karma-snapshot'
import beautify from 'js-beautify'
import Vue from 'vue'

Vue.config.devtools = false
Vue.config.productionTip = false
use(matchSnapshot)
window.expect = expect

use(matchSnapshot)
const MAX_LENGTH = 100
console.html = (value: any) => {
  console.log(beautify.html(value.outerHTML || value, {
    wrap_line_length: MAX_LENGTH,
  }))
}

console.js = (value: any) => {
  console.log(beautify(value,  {
    wrap_line_length: MAX_LENGTH,
  }))
}

console.css = (value: any) => {
  console.log(beautify.css(value))
}

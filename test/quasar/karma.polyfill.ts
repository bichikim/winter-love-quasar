/**
 * Setting before karma is ran
 */
/* eslint-disable no-console,camelcase */
/* istanbul ignore file It cannot be tested because It is polyfills*/
import {expect} from 'chai'
import Vue from 'vue'

Vue.config.devtools = false
Vue.config.productionTip = false

window.expect = expect



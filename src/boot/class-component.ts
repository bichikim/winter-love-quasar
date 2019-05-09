import Component from 'vue-class-component'
import {Context} from 'quasar'

export default () => {
  Component.registerHooks([
    'layout',
  ])
}

import Component from 'vue-class-component'
import middleware from '@/lib/middleware'

export default () => {
  Component.registerHooks([
    'middleware',
  ])
}

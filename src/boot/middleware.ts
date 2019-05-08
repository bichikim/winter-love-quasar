import middleware from '@/lib/middleware'
import Component from 'vue-class-component'
Component.registerHooks([
  'middleware',
  'layout',
])

export default ({app, store, router}) => {
  middleware<any, any>({app, store, router})
}

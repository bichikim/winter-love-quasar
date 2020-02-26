import * as Sinai from 'sinai'
import aside from './aside'
import auth from './auth'


const store = (ctx) => {
  const {Vue} = ctx

  Vue.use(Sinai)

  const root = Sinai.module()
  root.child('aside', aside(ctx))
  root.child('auth', auth(ctx))

  class Fake {
    get store() {
      return store
    }
  }

  // @ts-ignore
  declare module 'vue/types/vue' {
    interface Vue {
      // @ts-ignore
      $store: typeof Fake.prototype.store
    }
  }

  return Sinai.store(root, {
    strict: process.env.DEV,
  })
}

export default store

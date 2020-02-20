import * as Project from '@/types'
import messages from './messages'
import VueI18n from 'vue-i18n'
import {defaultsDeep} from 'lodash'

declare module '@/store/context' {
  interface ContextRecode {
    i18n: () => VueI18n
  }
}

interface Options {
  messages?: {[key: string]: any}
}

const i18n: Project.BootFileFunction = ({app, Vue}, options: Options = {}) => {
  if(app.i18n) {
    return
  }

  Vue.use(VueI18n)

  const {messages: _messages = {}} = options

  // Set i18n instance on app
  const i18n = new VueI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US',
    messages: defaultsDeep(_messages, messages),
  })

  app.i18n = i18n

  Vue.storeContext.set('i18n', () => (i18n))
}

export default i18n

import {BootFileFunction} from 'quasar'
import messages from '@/i18n'
import VueI18n from 'vue-i18n'

const i18n: BootFileFunction = ({app, Vue}) => {
  if(app.i18n) {
    return
  }

  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages,
  })
}

export default i18n

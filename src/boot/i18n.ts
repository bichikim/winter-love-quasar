import {Context} from 'quasar'
import messages from 'src/i18n'
import VueI18n from 'vue-i18n'

export default ({app, Vue}: Context) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages,
  })
}

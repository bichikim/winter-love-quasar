import Vue from 'vue'
import boot from './src/boot'
import i18n from '@/boot/i18n'

Vue.config.devtools = true

export default (previewComponent) => {
  const {app} = boot([i18n], Vue)

  return {
    ...app,
    render(h) {
      return h(previewComponent)
    },
  }
}

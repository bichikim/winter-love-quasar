import boot from './boot'
import firebase from '@/boot/firebase'
import i18n from '@/boot/i18n'

export default (previewComponent) => {
  const {app} = boot([firebase, i18n])

  return {
    ...app,
    render(h) {
      return h(previewComponent)
    },
  }
}

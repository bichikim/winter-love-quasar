/* eslint-disable require-atomic-updates */
import Vue from 'vue'

Vue.config.devtools = true

export default (previewComponent) => {

  return {
    data() {
      return {
        env: 'hello',
      }
    },
    provide() {
      return {
        env: 'hello',
      }
    },
    async created(this: any) {
      // @ts-ignore
      // if(!window.__boot) {
      //   // @ts-ignore
      //   window.__boot = await boot([i18n], Vue)
      // }
      // const {app} = window._boot
      //
      // Object.assign(this.$options, app, {store: undefined})
    },
    render(h) {
      return h(previewComponent)
    },
  }
}

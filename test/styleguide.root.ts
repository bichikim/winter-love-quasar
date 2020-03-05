/* eslint-disable require-atomic-updates */
import {merge} from 'lodash'
import axios from 'src/boot/axios'
import i18n from 'src/boot/i18n'
import 'src/boot/icon'
import Vue from 'vue'
import boot from './src/create-boot'

Vue.config.devtools = true

export default (previewComponent) => {

  return {
    data() {
      return {
        showComponent: false,
      }
    },
    provide() {
      return {
        env: 'hello',
      }
    },
    async created(this: any) {
      // call all boots
      // @ts-ignore
      if(!window.__boot) {
        // boot function can be async
        // @ts-ignore
        window.__boot = await boot([i18n, axios], Vue, {
          app: {},
          Vue,
          ssrContext: null,
        })
      }

      //@ts-ignore
      const {context: {app}} = window.__boot

      merge(previewComponent, app)

      this.showComponent = true
    },
    render(this: any, h) {
      if(!this.showComponent) {
        return undefined
      }
      return h('div', {
        style: {
          background: '#EEE',
          backgroundImage: 'radial-gradient(#CCC 20%, transparent 0),' +
            ' radial-gradient(#CCC 20%, transparent 0)',
          backgroundPosition: '0 0, 10px 10px',
          backgroundSize: '20px 20px',
        },
      }, [h(previewComponent)])
    },
  }
}

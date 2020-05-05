/**
 * style guide each component root
 */

/* eslint-disable require-atomic-updates */
import {merge} from 'lodash'
import axios from 'src/boot/axios'
import i18n from 'src/boot/i18n'
import 'src/boot/icon'
import Vue from 'vue'
import boot from './src/create-boot'

// set devtool true because the vue-styleguides set it false
Vue.config.devtools = true

const _boot = {
  get value() {
    // @ts-ignore
    return window.__boot
  },
  set value(value) {
    // @ts-ignore
    window.__boot = value
  },
}

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
      if(!_boot.value) {
        // boot function can be async
        _boot.value = await boot([i18n, axios], Vue, {
          bootParams : {
            app: {},
            Vue,
            router: this.router,
            ssrContext: null,
            store: null,
          },
        })
      }

      const {context: {app}} = _boot.value

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

<template lang="pug">
  #q-app
    router-view(:key="reloadKey")
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import app from 'src/store/modules/App'

  /**
   * Register component hook
   * @link https://github.com/vuejs/vue-class-component#adding-custom-hooks
   * @link https://quasar.dev/quasar-plugins/meta for meta
   */
  Component.registerHooks(['meta', 'preFetch', 'serverPrefetch'])

  /**
   * Init app setting in runtime level
   * handling install service worker
   */
  @Component
  export default class App extends Vue {
    /**
     * how to reload page after installing updated sw
     */
    @Prop({default: false})  swUpdateSoftReload: boolean

    reloadKey: number = 0

    get swUpdateWaiting() {
      return app.swUpdateWaiting
    }

    set swUpdateWaiting(value: boolean) {
      app.setSwUpdateWaiting(value)
    }

    get swError() {
      return app.swError
    }

    set swError(message: string | null) {
      app.setSwError(message)
    }

    get swOffline() {
      return app.swOffline
    }

    set swOffline(value: boolean) {
      app.setSwOffline(value)
    }

    /**
     * Add Quasar icon mapping logic
     */
    iconMap() {
      this.$q.iconMapFn = (iconName) => {
        if(iconName.startsWith('icon-')) {
          const name = iconName.substring(5)
          return {
            cls: `icon icon-${name}`,
          }
        }
      }
    }

    /**
     * start install updated sw
     * @param event
     */
    onOkUpdate(event) {
      const {detail} = event
      const worker = detail?.waiting
      if(!worker) {
        return
      }
      const channel = new MessageChannel()
      channel.port1.onmessage = (event) => {
        if(event.data.error) {
          this.swUpdateWaiting = false
          this.swError = event.data.error?.message ?? 'Cannot install the updated service work'
          return
        }

        this.swUpdateWaiting = false

        if(this.swUpdateSoftReload) {
          this.reloadKey += 1
          return
        }
        location.reload()
      }
      worker.postMessage({type: 'SKIP_WAITING'}, [channel.port2])
    }

    /**
     * Receive sw updated event
     * @param event
     */
    onServiceUpdated(event) {
      this.swUpdateWaiting = true
      this.$q.dialog({
        message: 'Service updated. Would you like to reload?',
        seamless: true,
        position: 'top',
        cancel: true,
      }).onOk(() => {
        this.onOkUpdate(event)
      })
    }

    onServiceOffline() {
      this.swOffline = true
    }

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    created() {
      document.addEventListener('updated', this.onServiceUpdated)
      document.addEventListener('offline', this.onServiceOffline)
      // Run adding Quasar icon mapping
      this.iconMap()
    }

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    beforeDestroy() {
      document.removeEventListener('updated', this.onServiceUpdated)
      document.removeEventListener('offline', this.onServiceOffline)
    }
  }
</script>

<style>
</style>

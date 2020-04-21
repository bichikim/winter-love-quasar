<template lang="pug">
  #q-app
    router-view(:key="reloadKey")
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'

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
    swUpdateWaiting: 'none' | 'waiting' | 'error' = 'none'

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
          this.swUpdateWaiting = 'error'
          return
        }

        this.swUpdateWaiting = 'none'

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
      this.swUpdateWaiting = 'waiting'
      this.$q.dialog({
        message: 'Service updated. Would you like to reload?',
        seamless: true,
        position: 'top',
        cancel: true,
      }).onOk(() => {
        this.onOkUpdate(event)
      })
    }

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    created() {
      document.addEventListener('updated', this.onServiceUpdated)
      // Run adding Quasar icon mapping
      this.iconMap()
    }

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    beforeDestroy() {
      document.removeEventListener('updated', this.onServiceUpdated)
    }
  }
</script>

<style>
</style>

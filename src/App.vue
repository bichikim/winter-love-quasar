<template lang="pug">
  #q-app
    router-view(:key="reloadKey")
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  /**
   * Register component hook
   * @link https://github.com/vuejs/vue-class-component#adding-custom-hooks
   * @link https://quasar.dev/quasar-plugins/meta for meta
   */
  Component.registerHooks(['meta', 'preFetch', 'serverPrefetch'])

  /**
   * Init app setting in runtime level
   */
  @Component
  export default class App extends Vue {

    reloadKey: number = 0

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

    onServiceUpdated(event) {
      this.$q.dialog({
        message: 'Service updated. Would you like to reload?',
        seamless: true,
        position: 'top',
        cancel: true,
      }).onOk(() => {
        this.reloadKey += 1
      })
    }

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    created() {
      document.addEventListener('updated', this.onServiceUpdated)
      // Run adding Quasar icon mapping
      this.iconMap()
    }

    beforeDestroy() {
      document.removeEventListener('updated', this.onServiceUpdated)
    }
  }
</script>

<style>
</style>

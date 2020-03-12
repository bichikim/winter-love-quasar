<template lang="pug">
  #q-app
    router-view
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'vue-property-decorator'
  import Store from 'src/store/root'

  /**
   * Register component hook
   * @link https://github.com/vuejs/vue-class-component#adding-custom-hooks
   * @link https://quasar.dev/quasar-plugins/meta for meta
   */
  Component.registerHooks(['meta'])

  /**
   * Init app setting in runtime level
   */
  @Component
  export default class App extends Vue {

    @Provide('store') store: Store = new Store()

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

    // noinspection JSUnusedGlobalSymbols Vue life cycle
    created() {

      // Run adding Quasar icon mapping
      this.iconMap()
    }
  }
</script>

<style>
</style>

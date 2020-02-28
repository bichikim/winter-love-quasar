<template lang="pug">
  q-layout(:view="view" ref="layout")
    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar
        q-btn.shadow-3.all-pointer-events(
          flat dense
          @click="onClickOpen"
          icon="las la-bars"
        )
        q-space
        q-btn.shadow-3.all-pointer-events(
          flat dense
          :icon="dark ? 'las la-moon' : 'las la-sun'" @click="onToggleDark")
    q-no-ssr
      side-navigation(
        :items="items"
        v-model="open"
        :mini="mini"
        @click="onNavClick"
        :elevated="true"
      )
    .background
      q-no-ssr
        w-map(:apiKey="apiKey" :dark="dark")
    q-page-container.no-pointer-events
      router-view
</template>

<style lang="stylus">
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
</style>

<script lang="ts">
  import {Dark} from 'quasar'
  import {Component, Prop, Vue} from 'vue-property-decorator'


  @Component({
    components: {
      SideNavigation: () => (import('src/components/navigation/SideNavigation.vue')),
      WMap: () => (import('src/components/map/WMap.vue')),
    },
    filters: {
      unKnown(value: string) {
        if(value) {
          return value
        }
        return 'unknown'
      },
    },
  })
  export default class MainLayout extends Vue {
    @Prop({default: 'lHh Lpr fff'}) view: string
    @Prop({default: 1023}) breakpoint: number

    open: boolean = false
    mini: boolean = false
    version: string = 'version'
    layout: any = null
    apiKey: string = process.env.VUE_GOOGLE_MAPS_API_KEY
    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    }

    get items() {
      return this.$store.state.aside.items
    }

    get dark() {
      return Dark.isActive
    }

    get belowBreakpoint() {
      const {layout} = this
      if(!layout) {
        return true
      }
      return layout.totalWidth <= this.breakpoint
    }

    get menuBtnIcon() {
      return 'menu'
    }

    onClickOpen() {
      if(this.belowBreakpoint) {
        this.open = !this.open
        return
      }
      this.mini = !this.mini
    }

    onNavClick(value) {
      if(value.push) {
        this.$router.push(value.push)
      }
      if(value.replace) {
        this.$router.replace(value.replace)
      }
    }

    onToggleDark() {
      Dark.toggle()
    }

    mounted() {
      this.layout = this.$refs.layout
    }
  }
</script>

<style lang="stylus" scoped>
</style>

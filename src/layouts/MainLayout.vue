<template lang="pug">
  q-layout(:view="view" ref="layout")
    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs(:class="side === 'right'? 'reverse' : ''")
        q-btn.shadow-3.all-pointer-events(
          flat dense
          @click="onClickOpen"
          icon="las la-bars"
        )
        q-space
        q-btn.shadow-3.all-pointer-events(
          flat dense
          :icon="dark ? 'las la-moon' : 'las la-sun'" @click="onToggleDark")
        q-btn.shadow-3.all-pointer-events(
          flat dense
          icon="las la-hand-paper"
          :class="side === 'left' ? 'reflect' : ''"
          @click="onToggleSide"
        )
    q-no-ssr
      side-navigation(
        :items="items"
        :side="side"
        v-model="open"
        :mini="mini"
        :breakpoint="breakpoint"
        @click="onNavClick"
        @below-breakpoint="belowBreakpoint = $event"
        :elevated="true"
        ref="drawer"
      )
    .background.absolute-top-left.fit
      q-no-ssr
        w-map(:apiKey="apiKey" :dark="dark")
    q-page-container.no-pointer-events
      router-view
</template>

<style lang="stylus">

  .reflect
    transform scale(-1, 1)
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
    @Prop({default: 'lHr Lpr lFr'}) view: string
    @Prop({default: 1023}) breakpoint: number

    open: boolean = false
    mini: boolean = false
    side: string = 'right'
    version: string = 'version'
    layout: any = null
    apiKey: string = process.env.VUE_GOOGLE_MAPS_API_KEY
    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    }
    belowBreakpoint: boolean = false

    get items() {
      return this.$store.state.aside.items
    }

    get dark() {
      return Dark.isActive
    }

    get menuBtnIcon() {
      return 'menu'
    }

    onToggleSide() {
      if(this.side === 'left') {
        this.side = 'right'
      } else {
        this.side = 'left'
      }
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

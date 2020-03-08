<template lang="pug">
  q-layout.main-layout(:view="view" ref="layout")
    // portal menu-btn
    portal(:to="belowBreakpoint ? 'footer-menu-btn' : 'header-menu-btn'")
      q-btn.shadow-3.glass.active(
        flat dense
        @click="onClickOpen"
        :icon="isMenuActive ? 'las la-times' : 'las la-bars'"
        size="md"
      )
    portal(:to="belowBreakpoint ? 'footer-search-bar' : 'header-search-bar'")
      w-search-bar(:value="!open")
    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs.all-pointer-events(:class="toolbarClass")
        // over breackpoint menu button
        portal-target(name="header-menu-btn")
        portal-target.w-grow(name="header-search-bar")

        // dark mode button
        q-btn.shadow-3.glass(
          flat dense
          :icon="dark ? 'las la-moon' : 'las la-sun'" @click="onToggleDark")

        // Left-handed Right-handed button
        q-btn.shadow-3.glass(
          flat dense
          icon="las la-hand-paper"
          :class="side === 'left' ? 'reflect' : ''"
          @click="onToggleSide"
        )
    // only below breakpoint
    template(v-if="belowBreakpoint")
      q-footer.bg-transparent.q-pa-none.no-pointer-events
        q-toolbar.row.q-gutter-x-sm.footer.q-pr-xs.all-pointer-events(:class="toolbarClass")
          // below breackpoint menu button
          portal-target(name="footer-menu-btn")
          .w-grow.relative-position.handy-navigation-wrapper
            // search input
            portal-target(name="footer-search-bar")
            //  below breakpoint navigation
            w-handy-navigation.absolute-top-left.full-width(
              :value="open"
              :items="items"
              :side="side"
            )
    // only over breackpoint
    template(v-else)
      // for safty navitaion cannot be rendered in ssr
      q-no-ssr()
        w-side-navigation.glass(
          :items="items"
          :side="side"
          :mini="mini"
          :breakpoint="breakpoint"
          @click="onNavClick"
          :elevated="true"
          ref="drawer"
        )
    .background.absolute-top-left.fit
      q-no-ssr
        earth-map(:dark="dark")
    q-page-container.no-pointer-events
      router-view
</template>

<style lang="stylus" scoped>
  .handy-navigation-wrapper
    height 40px
</style>

<script lang="ts">
  import {Dark, QLayout} from 'quasar'
  import Store from 'src/store/root'
  import {Component, Prop, Inject, Ref, Vue} from 'vue-property-decorator'
  import WSideNavigation from 'src/components/navigation/WSideNavigation.vue'
  import WHandyNavigation from 'src/components/navigation/WHandyNavigation.vue'
  import WSearchBar from 'src/components/search-bar/WSearchBar.vue'

  @Component({
    components: {
      QLayout,
      WSideNavigation,
      WHandyNavigation,
      WSearchBar,
    },
  })
  export default class MainLayout extends Vue {
    @Prop({default: 'lHr Lpr lFr'}) view: string
    @Prop({default: 1023}) breakpoint: number
    @Ref() layout?: any
    @Inject() store: Store

    /**
     * open handy navigation
     */
    open: boolean = false

    /**
     * to be mini aside navigation
     */
    mini: boolean = false

    /**
     * layout side for Left-handed & Right-handed
     */
    // side: string = 'right'

    version: string = 'version'
    apiKey: string = process.env.VUE_GOOGLE_MAPS_API_KEY
    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    }

    get side() {
      return this.store.auth.side
    }

    set side(value) {
      this.store.auth.side = value
    }

    get toolbarPad() {
      return ''
    }

    get items() {
      return this.store.aside.items
    }

    /**
     * whether in quasar dark mode
     */
    get dark() {
      return Dark.isActive
    }

    get menuBtnIcon() {
      return 'menu'
    }

    get isMenuActive() {
      const {belowBreakpoint, mini, open} = this
      if(belowBreakpoint) {
        return open
      }
      return !mini
    }

    get toolbarClass() {
      return this.side === 'right'? 'reverse' : ''
    }

    get belowBreakpoint() {
      return (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
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

  }
</script>


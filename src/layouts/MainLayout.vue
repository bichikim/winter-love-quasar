<template lang="pug">
  q-layout.main-layout(:view="view" ref="layout")
    portal(:to="belowBreakpoint ? 'footer-menu-btn' : 'header-menu-btn'")
      q-btn.shadow-3.glass.active(
        flat dense
        @click="onClickOpen"
        :icon="isMenuActive ? 'las la-times' : 'las la-bars'"
      )
    q-header.bg-transparent.no-event
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs(:class="toolbarClass")
        // over breackpoint menu button
        portal-target(name="header-menu-btn")
        w-search-bar.w-grow(:value="!belowBreakpoint")

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
      q-footer.bg-transparent.no-event
        q-toolbar.row.q-gutter-x-md.q-pr-none.con.footer.q-pb-md(:class="toolbarClass")
          // below breackpoint menu button
          portal-target(name="footer-menu-btn")
          .w-grow.relative-position.handy-navigation-wrapper.footer-wrapper
            // search input
            w-search-bar(:value="belowBreakpoint && !open")
            //  below breakpoint navigation
            w-handy-navigation.absolute-top-left.fit(
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
        w-map(:dark="dark")
    q-page-container.no-pointer-events
      router-view
</template>

<style lang="stylus">
  .reflect
    transform scale(-1, 1)
  .footer
    height 32px
  .footer-wrapper
    height 32px
  .no-event
    pointer-events none
  .no-event>div>*
    pointer-events auto
</style>

<script lang="ts">
  import {Dark} from 'quasar'
  import Store from 'src/store/root'
  import {Component, Prop, Inject, Ref, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      WSideNavigation: () => (import('src/components/navigation/WSideNavigation.vue')),
      WHandyNavigation: () => (import('src/components/navigation/WHandyNavigation.vue')),
      WSearchBar: () => (import('src/components/search-bar/WSearchBar.vue')),
    },
  })
  export default class MainLayout extends Vue {
    @Prop({default: 'lHr Lpr lFr'}) view: string
    @Prop({default: 1023}) breakpoint: number
    @Ref() layout: any
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
    side: string = 'right'
    version: string = 'version'
    apiKey: string = process.env.VUE_GOOGLE_MAPS_API_KEY
    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
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


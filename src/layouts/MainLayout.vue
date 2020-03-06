<template lang="pug">
  q-layout.main-layout(:view="view" ref="layout")
    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs(:class="toolbarClass")

        // over breackpoint menu button
        q-btn.shadow-3.glass.all-pointer-events(
          v-if="!belowBreakpoint"
          flat dense
          @click="onClickOpen"
          icon="las la-bars"
        )
        q-space

        // dark mode button
        q-btn.shadow-3.glass.all-pointer-events(
          flat dense
          :icon="dark ? 'las la-moon' : 'las la-sun'" @click="onToggleDark")

        // Left-handed Right-handed button
        q-btn.shadow-3.glass.all-pointer-events(
          flat dense
          icon="las la-hand-paper"
          :class="side === 'left' ? 'reflect' : ''"
          @click="onToggleSide"
        )
    // only below breakpoint
    template(v-if="belowBreakpoint")
      q-footer.bg-transparent.no-pointer-events
        q-toolbar.row.q-gutter-x-md.q-pr-none.con.footer.q-pb-md(:class="toolbarClass")
          // below breackpoint menu button
          q-btn.shadow-3.glass.all-pointer-events(
            flat dense
            icon="las la-bars"
            @click="onClickOpen"
          )
          .all-pointer-events.grow.relative-position.handy-navigation-wrapper.footer-wrapper
            // search input
            transition(
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            )
              q-input.text-primary.glass(value="hello" dense standout v-show="!open")
            //  below breakpoint navigation
            w-handy-navigation.absolute-top-left.fit(
              :value="open"
              :items="items"
            )
    // only over breackpoint
    template(v-else)
      // for safty navitaion cannot be rendered in ssr
      q-no-ssr()
        w-side-navigation.glass(
          :items="items"
          :side="side"
          :mini="open"
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
  .grow
    flex-grow 1
  .footer
    height 32px
  .footer-wrapper
    height 32px
</style>

<script lang="ts">
  import {Dark} from 'quasar'
  import {Component, Prop, Vue, Ref, Provide} from 'vue-property-decorator'
  import Store from 'src/store/root'

  @Component({
    components: {
      WSideNavigation: () => (import('src/components/navigation/WSideNavigation.vue')),
      WHandyNavigation: () => (import('src/components/navigation/WHandyNavigation.vue')),
    },
  })
  export default class MainLayout extends Vue {
    @Prop({default: 'lHr Lpr lFr'}) view: string
    @Prop({default: 1023}) breakpoint: number
    @Ref() layout: any

    open: boolean = false
    mini: boolean = false
    side: string = 'right'
    version: string = 'version'
    apiKey: string = process.env.VUE_GOOGLE_MAPS_API_KEY
    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    }

    @Provide('store') rootStore: Store = new Store()

    get items() {
      return this.rootStore.aside.items
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
      this.open = !this.open
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


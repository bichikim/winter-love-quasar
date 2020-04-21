<template lang="pug">
  q-layout.main-layout(:view = "view" ref = "layout")

    template
      portal(:to = "belowBreakpoint ? 'footer-search-bar' : 'header-search-bar'")
        w-search-bar(@click-barcode="onClickBarcode" v-model="searchValue")

    template
      .background.absolute-top-left.fit
        q-no-ssr
          earth-map(:dark="dark")

    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs.all-pointer-events(:class="toolbarClass")
        portal-target.w-grow(name="header-search-bar")

        // dark mode button
        q-btn.shadow-3.glass(
          flat dense
          :icon="dark ? 'las la-moon' : 'las la-sun'"
          @click="onToggleDark"
          aria-label="Toggle Dark Mode"
        )

        // Left-handed Right-handed button
        q-btn.shadow-3.glass(
          flat dense
          icon="las la-hand-paper"
          :class="side === 'left' ? 'w-reflect' : ''"
          @click="onToggleSide"
          aria-label="Toggle Left Right Hand"
        )

    template(v-if="belowBreakpoint")
      q-footer.bg-transparent.q-pa-none.no-pointer-events
        q-toolbar.row.q-gutter-x-sm.footer.q-pr-xs.all-pointer-events(:class="toolbarClass")
          w-handy-navigation.handy-navigation-wrapper(
            :value="true"
            :items="items"
            :side="side"
            @click="onNavClick"
          )
          portal-target.w-grow(name="footer-search-bar")

    template(v-else)
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
          template(#default="{mini: _mini}")
            .navigation-header
              .profile
                q-item
                  q-item-section(side)
                    q-avatar.bg-red(size="xl")
                      img(src="~assets/empty-avatar.png")
                  q-item-section(v-show="!_mini")
                    q-item-label.text-h5 helle
                q-item
                  q-item-section
                  q-item-section(top side)
                    .q-gutter-sm.row.no-wrap
                      q-btn(
                        v-show="!_mini"
                        flat dense rounded
                        aria-label="User"
                        icon="las la-user"
                      )
                      q-btn(
                        flat dense rounded
                        aria-label="toggle pin mini"
                        :icon="mini ? 'las la-thumbtack' : 'icon-thumbtack'"
                        @click="mini = !mini"
                      )

                q-separator

    q-page-container.no-pointer-events
      router-view

    template
      w-bar-code-dialog(
        v-model="barcodeOpened"
        :prefer-camera-id="barcodePreferCameraId"
        :maximized="belowBreakpoint"
        @changed-camera="onChangedCamera"
        @scan="onScan"
      )
</template>

<script lang="ts">
  import userOptions from 'src/store/modules/UserOptions'
  import aside from 'src/store/modules/Aside'
  import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
  import WSideNavigation from './navigation/WSideNavigation.vue'
  import WHandyNavigation from './navigation/WHandyNavigation.vue'
  import WSearchBar from './search-bar/WSearchBar.vue'
  import WBarCodeDialog from './bar-code/WBarCodeDialog.vue'
  import {Result} from '@zxing/library'

  @Component({
    components: {
      WSideNavigation,
      WHandyNavigation,
      WSearchBar,
      WBarCodeDialog,
    },
  })
  export default class MainLayout extends Vue {
    @Prop({default: 'lHr Lpr lFr'}) view: string
    @Prop({default: 1023}) breakpoint: number
    @Ref() layout?: any

    /**
     * to be mini aside navigation
     */
    mini: boolean = false

    barcodeOpened: boolean = false

    barcodePreferCameraId: string | null = null

    barcodeValue: Result | null = null

    searchValue: string = ''

    mapConfig: google.maps.MapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
    }

    get side() {
      return userOptions.side
    }

    set side(value) {
      userOptions.setSide(value)
    }

    get items() {
      return aside.items
    }

    /**
     * whether in quasar dark mode
     */
    get dark() {
      return userOptions.dark
    }

    get toolbarClass() {
      return this.side === 'right' ? 'reverse' : ''
    }

    get belowBreakpoint() {
      return (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
    }

    onScan(value) {
      this.barcodeValue = value
      this.searchValue = value.toString()
    }

    onChangedCamera(value) {
      this.barcodePreferCameraId = value?.id ?? null
    }

    onClickBarcode() {
      this.barcodeOpened = !this.barcodeOpened
    }

    onToggleSide() {
      if(this.side === 'left') {
        this.side = 'right'
        return
      }
      this.side = 'left'
    }

    onNavClick(value) {
      if(value.push) {
        this.$router.push(value.push)
        return
      }
      if(value.replace) {
        this.$router.replace(value.replace)
      }
    }

    onToggleDark() {
      userOptions.setDark(!this.dark)
    }

  }
</script>


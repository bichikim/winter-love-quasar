<template lang="pug">
  q-layout.main-layout(:view = "view" ref = "layout")
    template
      .background.absolute-top-left.fit
        q-no-ssr
          w-spot-map(:dark="dark")
    q-header.bg-transparent.no-pointer-events
      q-toolbar.toolbar.q-gutter-x-sm.q-pr-xs.all-pointer-events(:class="toolbarClass")
        w-search-bar.w-grow(v-if="!belowBreakpoint" @click-barcode="onClickBarcode" v-model="searchValue")

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
            :display-name="displayName || undefined"
            @click="onNavClick"
          )
            q-item(clickable v-close-popup v-ripple @click="() => onNavClick({push: 'sign'})")
              q-item-section(avatar)
                q-icon(name="la la-key")
              q-item-section.text-no-wrap sign-in / sign-up
          w-search-bar.w-grow(v-if="belowBreakpoint" @click-barcode="onClickBarcode" v-model="searchValue")
    template(v-else)
      q-no-ssr()
        w-wide-navigation(
          :mini="mini"
          :side="side"
          :items="items"
          :breakpoint="breakpoint"
          @mini="mini = $event"
          @click="onNavClick"
        )
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

<i18n src="./index.json"></i18n>

<script lang="ts">
  import userOptions from 'src/store/modules/UserOptions'
  import aside from 'src/store/modules/Aside'
  import user from 'src/store/modules/User'
  import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
  import WSideNavigation from './navigation/WSideNavigation.vue'
  import WHandyNavigation from './navigation/WHandyNavigation.vue'
  import WSearchBar from './search-bar/WSearchBar.vue'
  import WBarCodeDialog from './bar-code/WBarCodeDialog.vue'
  import WWideNavigation from './navigation/WWideNavigation.vue'
  import WSpotMap from 'src/layouts/MainLayout/spot-map/WSpotMap.vue'

  import {Result} from '@zxing/library'

  @Component({
    components: {
      WSideNavigation,
      WHandyNavigation,
      WSearchBar,
      WBarCodeDialog,
      WWideNavigation,
      WSpotMap,
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

    loginTooltip: boolean = true

    get displayName() {
      return user.displayName
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
      return (
        (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
      )
    }

    get headerSize() {
      if(!this.layout?.header.space) {
        return 0
      }
      return this.layout?.header.size ?? 0
    }

    get footerSize() {
      if(!this.layout?.footer.space) {
        return 0
      }
      return this.layout?.footer.size ?? 0
    }

    get leftSize() {
      if(!this.layout?.left.space) {
        return 0
      }
      return this.layout?.left.size ?? 0
    }

    get rightSize() {
      if(!this.layout?.right.space) {
        return 0
      }
      return this.layout?.right.size ?? 0
    }

    onClickTest(event) {
      console.log('click', event)
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

    mounted() {
      setTimeout(() => {
        this.loginTooltip = false
      }, 2000)
    }
  }
</script>

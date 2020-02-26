<template lang="pug">
  q-layout(:view="view" ref="layout")
    q-header
      q-toolbar
        q-btn(flat @click="onClickOpen" dense icon="menu")
        q-space
        q-btn(flat round :icon="dark ? 'ion-moon' : 'ion-sunny'" @click="onToggleDark")
    q-no-ssr
      side-navigation(:items="items" v-model="open" :mini="mini" @click="onNavClick")
    q-page-container
      router-view
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {Dark} from 'quasar'


  @Component({
    components: {
      SideNavigation: () => (import('src/components/navigation/SideNavigation.vue')),
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

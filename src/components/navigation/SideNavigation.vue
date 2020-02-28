<template lang="pug">
  // should refrash q-drawer when side is changed (This is quasar bug)
  q-drawer.side-navigation(
    :value="value"
    :side="side"
    :key="side"
    show-if-above
    :behavior="behavior"
    :mini="mini && miniState"
    :class="classes"
    ref="drawer"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
    @input="$emit('input', $event)"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  )
    q-scroll-area.fit(:thumb-style="thumbStyle")
      side-navigation-list(@click="$emit('click', $event)" :items="items")
</template>

<style lang="stylus" scoped>
  .side-navigation::v-deep
    aside
      box-shadow $shadow-4

  .handy-drawer::v-deep
    aside
      height 300px
      top unset
      bottom 0
      overflow hidden
  .handy-drawer.right::v-deep
    aside
      border-top-left-radius 20px
  .handy-drawer.left::v-deep
    aside
      border-top-right-radius 20px
</style>

<script lang="ts">
  import {Component, Inject, Mixins, Prop, Watch} from 'vue-property-decorator'
  import NavigationShare from './NavigationShare'
  import {Side} from './types'

  @Component({
    components: {
      SideNavigationList: () => (import('./SideNavigationList.vue')),
    },
  })
  export default class SideNavigation<R> extends Mixins(NavigationShare) {
    @Prop({default: true}) value: boolean
    @Prop({default: 'left'}) side: Side
    @Prop({default: true}) mini: boolean
    @Prop({default: 'default'}) behavior: 'default' | 'desktop' | 'mobile'
    @Prop({default: false}) elevated: boolean
    @Prop({default: 1023}) breakpoint: number
    @Inject() readonly layout: any

    miniState: boolean = true
    drawer: any = null

    thumbStyle = {
      right: '4px',
      borderRadius: '9px',
      width: '4px',
      opacity: 0.2,
    }

    @Watch('belowBreakpoint', {immediate: true})
    __belowBreakpoint(value) {
      this.$emit('below-breakpoint', value)
    }

    get belowBreakpoint() {
      return this.layout.totalWidth <= this.breakpoint
    }

    get classes() {
      const classes: string[] = []
      if(this.belowBreakpoint) {
        classes.push('handy-drawer')
      }
      if(this.side === 'left') {
        classes.push('left')
      } else {
        classes.push('right')
      }
      return classes.join(' ')
    }

    mounted() {
      this.drawer = this.$refs.drawer as any
    }

    @Watch('mini')
    __mini(value) {
      this.miniState = value
    }


    onMouseover() {
      if(!this.mini) {
        return
      }
      this.miniState = false
    }

    onMouseout() {
      if(!this.mini) {
        return
      }
      this.miniState = true
    }
  }
</script>

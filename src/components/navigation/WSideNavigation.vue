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
    @mouseover="onMouseover"
    @mouseout="onMouseout"
    @input="$emit('input', $event)"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  )
    q-scroll-area.fit(:thumb-style="thumbStyle")
      w-side-navigation-list(@click="$emit('click', $event)" :items="items")
</template>

<style lang="stylus" scoped>
  .side-navigation::v-deep
    aside
      pointer-events all
      box-shadow $shadow-4
</style>

<script lang="ts">
  import {Component, Mixins, Prop, Watch} from 'vue-property-decorator'
  import WNavigationShare from 'src/components/navigation/WNavigationShare'
  import {Side} from './types'

  @Component({
    components: {
      WSideNavigationList: () => (import('src/components/navigation/WSideNavigationList.vue')),
    },
  })
  export default class WSideNavigation<R> extends Mixins(WNavigationShare) {
    @Prop({default: true}) value: boolean
    @Prop({default: 'left'}) side: Side
    @Prop({default: true}) mini: boolean
    @Prop({default: 'default'}) behavior: 'default' | 'desktop' | 'mobile'
    @Prop({default: false}) elevated: boolean

    miniState: boolean = true

    thumbStyle = {
      right: '4px',
      borderRadius: '9px',
      width: '4px',
      opacity: 0.2,
    }

    get classes() {
      const classes: string[] = []
      if(this.side === 'left') {
        classes.push('left')
      } else {
        classes.push('right')
      }
      return classes.join(' ')
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

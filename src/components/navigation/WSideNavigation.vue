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
    .content.column.fit
      .slot-wrapper.w-off-shrink.full-width
        slot(:mini="mini && miniState" :open="value")
      q-scroll-area.full-width.w-grow(:thumb-style="thumbStyle")
        w-side-navigation-list(@click="$emit('click', $event)" :items="items")
</template>

<style lang="stylus" scoped>
  .q-drawer::v-deep
    aside
      pointer-events all
      box-shadow $shadow-4
</style>

<script lang="ts">
  import WNavigationShare from 'src/components/navigation/WNavigationShare'
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import {Side} from './types'

  @Component({
    components: {
      WSideNavigationList: () => (import(
        /* webpackMode: "eager" */
        'src/components/navigation/WSideNavigationList.vue')),
    },
  })
  export default class WSideNavigation<R> extends Mixins(WNavigationShare) {
    @Prop({default: true}) value: boolean

    /**
     * Side to attach
     */
    @Prop({default: 'left'}) side: Side
    @Prop({default: true}) mini: boolean
    @Prop({default: 'default'}) behavior: 'default' | 'desktop' | 'mobile'
    @Prop({default: false}) elevated: boolean

    /**
     * Mouse over mini state
     */
    miniState: boolean = true

    /**
     * scroll thumb style
     */
    thumbStyle = {
      right: '4px',
      borderRadius: '9px',
      width: '4px',
      opacity: 0.2,
    }

    /**
     * q-drawer classes
     */
    get classes() {
      const classes: string[] = []
      if(this.side === 'left') {
        classes.push('left')
      } else {
        classes.push('right')
      }
      return classes.join(' ')
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

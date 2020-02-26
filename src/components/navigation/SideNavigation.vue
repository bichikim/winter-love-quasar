<template lang="pug">
  // should refrash q-drawer when side is changed (This is quasar bug)
  q-drawer.side-navigation(
    :value="value"
    :side="side"
    :key="side"
    show-if-above
    :behavior="behavior"
    :mini="mini && miniState"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
    @input="$emit('input', $event)"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  )
    q-scroll-area.fit
      side-navigation-list(@click="$emit('click', $event)" :items="items")
</template>

<script lang="ts">
  import {Component, Mixins, Prop, Watch} from 'vue-property-decorator'
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

    miniState: boolean = true

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

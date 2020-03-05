<template lang="pug">
  .navigation
    q-header
      q-toolbar(:class="side === 'right' ? 'reverse' : ''")
        q-btn(flat @click="myValue = !myValue" dense icon="menu" v-if="!landscapeView")
        header-navigation(v-if="landscapeView" v-bind="bind")
        .row(:class="slotClasses")
          slot

    side-navigation(
        v-if="!landscapeView"
        v-bind="bind"
        @click="onClick"
        @input="myValue = $event"
        :value="myValue"
      )
</template>

<script lang="ts">
  import {Component, Mixins, Prop, Watch} from 'vue-property-decorator'
  import WNavigationShare from 'src/components/navigation/WNavigationShare'
  import {NavItem, Side} from './types'

  @Component({
    components: {
      SideNavigation: () => (import('src/components/navigation/WSideNavigation.vue')),
    },
  })
  export default class Navigation<R extends Record<string, Function>>
    extends Mixins(WNavigationShare) {
    @Prop({default: false, type: Boolean}) value: boolean
    @Prop({default: false, type: Boolean}) landscapeView: boolean
    @Prop({default: 'left'}) side: Side
    @Prop({default: 'left'}) sideTitle: Side

    myValue: boolean = false

    @Watch('value', {immediate: true})
    __value(value) {
      this.myValue = value
    }

    @Watch('myValue', {immediate: true})
    __myValue(value) {
      this.$emit('input', value)
    }

    get bind() {
      const {items, side} = this
      return {items, side}
    }

    get slotClasses() {
      const {side, sideTitle} = this
      if(sideTitle === 'left') {
        if(side === 'left') {
          return 'q-ml-md'
        }
        return 'col-grow'
      }
      if(side === 'left') {
        return 'col-grow text-right'
      }

      return  'q-mr-md'
    }

    onClick(info: Pick<NavItem, 'push' | 'replace' | 'run'>) {
      if(info.push) {
        this.$emit('push', info.push)
        return
      }
      if(info.replace) {
        this.$emit('replace', info.replace)
        return
      }
      if(info.run) {
        this.$emit('run', info.run)
      }
    }
  }
</script>

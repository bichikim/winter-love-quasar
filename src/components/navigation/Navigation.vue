<template lang="pug">
  span(v-if="landscapeView") nothing
  side-navigation(v-else v-bind="bind" @click="onClick")
</template>

<style lang="stylus" scoped>
</style>

<script lang="ts">
  import {ExecutionInfo, NavItem} from '@/store/modules/aside'
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import {RawLocation} from 'vue-router'
  import NavigationShare from './NavigationShare'

  @Component({
    components: {
      SideNavigation: () => (import('./SideNavigation.vue')),
    },
  })
  export default class Navigation<R extends Record<string, Function>>
    extends Mixins(NavigationShare) {

    @Prop({default: false, type: Boolean}) landscapeView: boolean

    get bind() {
      const {items, executions, executionContext} = this
      return {items, executions, executionContext}
    }

    onClick(info: NavItem) {
      if(info.push) {
        this.push(info.push)
        return
      }
      if(info.replace) {
        this.push(info.replace)
        return
      }
      if(info.run) {
        this.run(info.run)
      }
    }

    run(info: ExecutionInfo<R>) {
      this.executions[info.name](this.executionContext, ...info.params)
    }

    push(to: RawLocation) {
      this.executionContext.router.push(to)
    }

    replace(to: RawLocation) {
      this.executionContext.router.replace(to)
    }
  }
</script>

<template lang="pug">
  q-page.column(
    :class="columnClasses"
    :style-fn="style"
  )
    q-no-ssr(v-if="noSsr")
      .row(:class="rowClasses")
        slot
    .row(:class="rowClasses" v-else)
      slot
</template>

<style lang="stylus" scoped>
  .q-page .padding
    padding 12px

  .q-page
    padding 12px
</style>

<script lang="ts">
  import {QPage} from 'quasar'
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator'

  @Component({
    components: {
      QPage,
    },
  })
  export default class WPage extends Vue {
    @Prop({default: true, type: Boolean}) padding: any
    @Prop({default: true, type: Boolean}) handyPosition: boolean
    @Prop({default: 1023}) breakpoint: number
    @Prop({default: false, type: Boolean}) rowCenter: boolean
    @Prop({default: false, type: Boolean}) columnCenter: boolean
    @Prop({default: true, type: Boolean}) noSsr: boolean
    @Inject() layout?: any

    get belowBreakpoint() {
      return (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
    }

    get columnClasses() {
      const {handyPosition, belowBreakpoint, padding, columnCenter} = this
      const classes: string[] = []

      if(padding) {
        classes.push('padding')
      }

      if(handyPosition) {
        if(belowBreakpoint) {
          classes.push('justify-end')
        } else if(columnCenter) {
          classes.push('justify-center')
        } else {
          classes.push('justify-start')
        }
      }
      return classes
    }

    get rowClasses() {
      const {rowCenter} = this
      const classes: string[] = []
      if(rowCenter) {
        classes.push('justify-center')
      } else {
        classes.push('justify-start')
      }

      return classes
    }

    style(offset, height) {
      return {height: `${height - offset}px`}
    }
  }
</script>

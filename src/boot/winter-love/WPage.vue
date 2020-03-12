<template lang="pug">
  q-page.column(
    :class="classes"
    :style-fn="style"
  )
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
    @Prop({default: true}) padding: any
    @Prop({default: true}) autoPosition: boolean
    @Prop({default: 1023}) breakpoint: number
    @Prop({default: true}) pageSize: boolean
    @Inject() layout?: any

    get belowBreakpoint() {
      return (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
    }

    get classes() {
      const {autoPosition, belowBreakpoint, padding} = this
      const classes: string[] = []

      if(padding) {
        classes.push('padding')
      }

      if(autoPosition) {
        if(belowBreakpoint) {
          classes.push('justify-end')
        } else {
          classes.push('justify-center')
        }
      }

      return classes
    }

    style(offset, height) {

      const style: any = {height: `${height - offset}px`}
      if(this.pageSize) {
        style.maxHeight = `${this.breakpoint}px`
      }
    }
  }
</script>

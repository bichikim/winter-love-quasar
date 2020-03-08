<template lang="pug">
  q-page.column(
    :class="classes"
    :style-fn="style"
    v-bind="{padding}"
  )
    slot
</template>

<style lang="stylus" scoped>
  .q-page
    padding 12px
</style>

<script lang="ts">
  import {Component, Inject, Prop, Vue} from 'vue-property-decorator'
  import {QPage} from 'quasar'

  @Component({
    components: {
      QPage,
    },
  })
  export default class WPage extends Vue {
    @Prop() padding: any
    @Prop({default: true}) autoPosition: boolean
    @Prop({default: 1023}) breakpoint: number
    @Inject() layout?: any

    get belowBreakpoint() {
      return (this.layout?.totalWidth ?? this.$q.screen.width) <= this.breakpoint
    }

    get classes() {
      const {autoPosition, belowBreakpoint} = this
      if(!autoPosition) {
        return ''
      }
      if(belowBreakpoint) {
        return 'justify-end'
      }
      return 'justify-start'
    }

    style(offset, height) {
      return {height: `${height - offset}px`}
    }
  }
</script>

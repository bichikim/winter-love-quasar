<template lang="pug">
  .w-handy-navigation.no-pointer-events
    transition(
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    )
      .fit.row.items-center.q-gutter-x-sm(v-if="value")
        q-btn.glass(label="foo" dense)
        q-btn.glass(label="foo" dense)
        q-btn.glass(label="foo" dense)
</template>

<style scoped lang="stylus">
  .w-handy-navigation
    height 40px

</style>

<script lang="ts">
  import {
    Component, Prop, Vue, Inject,
  } from 'vue-property-decorator'

  @Component
  export default class WHandyNavigation extends Vue {
    @Prop({default: true}) value: boolean
    @Inject({default: {}}) readonly layout: any

    get totalHeight() {
      return this.layout.totalHeight ?? this.$q.screen.height
    }

    get totalWidth() {
      return this.layout.totalWidth ?? this.$q.screen.height
    }
  }
</script>

<template lang="pug">
  q-btn.glass.shadow-3(
    flat dense
    size="md"
  )
    w-user-avatar(rounded square :display-name="displayName" :avatar="avatar")
      .icon.absolute-top-left.fit(v-if="open")
        .icon-background.absolute-top-left.fit.rounded-borders
        q-icon.fit(name="las la-times" size="sm")
    q-menu(
      :target="true"
      breakpoint="0"
      :offset="[8, 0]"
      v-model="open"
    )
      w-handy-navigation-list(
        :items="items"
        :side="side"
      )
</template>

<style lang="stylus" scoped>
  .wrapper
    position absolute
  .q-btn::v-deep
    .q-btn__wrapper
      padding 0
  .icon-background
    background $light-dimmed-background
    backdrop-filter: blur(3px)
  .body--dark .icon-background
    background-color $dimmed-background
</style>

<script lang="ts">
  import {Component, Mixins, Prop} from 'vue-property-decorator'
  import WNavigationShare from './WNavigationShare'
  import WHandyNavigationList from './WHandyNavigationList.vue'
  import shortName from 'src/filters/shart-name'
  import WUserAvatar from 'src/components/WUserAvatar.vue'

  // :icon="open ? 'las la-times' : 'las la-bars'"
  @Component({
    components: {
      WHandyNavigationList,
      WUserAvatar,
    },
    filters: {
      shortName,
    },
  })
  export default class WHandyNavigation extends Mixins(WNavigationShare) {
    // open or not
    @Prop({default: true}) value: boolean
    @Prop({default: true}) dense: boolean
    @Prop({default: 300}) maxHeight: number
    @Prop() avatar?: string
    @Prop({default: 'Unknown'}) displayName: string

    /**
     * animation side
     */
    @Prop({default: 'right'}) side: boolean

    open: boolean = false
  }
</script>

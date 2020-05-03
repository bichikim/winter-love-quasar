<template lang="pug">
  w-side-navigation.glass(
    :items="items"
    :side="side"
    :mini="mini"
    :breakpoint="breakpoint"
    :elevated="elevated"
    @click="$emit('click', $event)"
  )
    template(#default="{mini: _mini}")
      .navigation-header
        .profile
          q-item
            q-item-section(side)
              w-user-avatar(
                :display-name="displayName"
                :avatar="avatar"
              )
          q-item
            q-item-section
            q-item-section(top side)
              .q-gutter-sm.row.no-wrap
                q-btn(
                  v-show="!_mini"
                  flat dense rounded
                  aria-label="User"
                  icon="las la-user"
                )
                q-btn(
                  flat dense rounded
                  aria-label="toggle pin mini"
                  :icon="mini ? 'las la-thumbtack' : 'icon-thumbtack'"
                  @click="onMini"
                )
          q-separator
</template>

<style lang="stylus" scoped></style>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import WSideNavigation from './WSideNavigation.vue'
  import {NavItem} from 'layouts/MainLayout/navigation/types'
  import {Side} from 'src/store/modules/UserOptions/types'
  import shortName from 'src/filters/shart-name'
  import WUserAvatar from 'src/components/WUserAvatar.vue'

  @Component({
    components: {
      WSideNavigation,
      WUserAvatar,
    },
    filters: {
      shortName,
    },
  })
  export default class WWideNavigation extends Vue {
    @Prop({default: false}) mini: boolean
    @Prop() items: NavItem[]
    @Prop({default: 'right'}) side: Side
    @Prop({default: 1023}) breakpoint: number
    @Prop({default: true}) elevated: boolean
    @Prop() avatar?: string
    @Prop({default: 'Unknown'}) displayName: string

    onMini() {
      this.$emit('mini', !this.mini)
    }
  }
</script>

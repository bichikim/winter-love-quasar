<template lang="pug">
  q-layout(:view="view")
    q-header(elevated)
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat round dense @click='open = !open' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title
          | Winter Love Project
        div() {{$q.version}}
    q-navigation(:items="items" @input="handleNav" v-model="open" data-namespace="navigation")
      .q-pa-md.fit
        q-avatar(size="56px")
          q-img(src="https://www.w3schools.com/howto/img_avatar.png")
        .text-h5 {{name | unKnown}}
        .subtitle {{link | unKnown}}
    q-page-container
      router-view

</template>

<script lang="ts">
  import QNavigation from '@/components/navigation/QNavigation.vue'
  import {NavItem} from '@/components/types/navigation'
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {namespace} from 'vuex-class'

  const aside = namespace('aside')
  const auth = namespace('auth')

  @Component({
    components: {
      QNavigation,
    },
    filters: {
      unKnown(value: string) {
        if(value) {
          return value
        }
        return 'unknown'
      },
    },
  })
  export default class Index extends Vue {
    @Prop({default: 'lHh Lpr fff'}) view: string
    @aside.State items: NavItem
    @auth.State name?: string
    @auth.State link?: string

    open: boolean = true
    version: string = 'version'

    handleNav(url) {
      console.log(url)
    }
  }
</script>

<style lang="stylus" scoped>
</style>

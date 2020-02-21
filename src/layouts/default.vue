<template lang="pug">
  q-layout(:view="view")
    q-header(elevated)
      q-toolbar(:glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'")
        q-btn(flat round dense @click='open = !open' aria-label="menu")
          q-icon(name="ion-menu")
        q-toolbar-title
          | Winter Love Project
        div() {{$q.version}}
    q-page-container
      router-view

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {namespace} from 'vuex-class'

  const auth = namespace('auth')

  @Component({
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

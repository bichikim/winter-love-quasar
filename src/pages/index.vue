<template lang="pug">
  q-page.felx.flex-center
    q-btn(icon="icon-smart-home")
</template>

<style>
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {NavItem, ExecutionRecord} from '@/store/modules/aside'

const aside = namespace('aside')
const auth = namespace('auth')

@Component
export default class IndexPage extends Vue {
  @aside.State items: (NavItem<ExecutionRecord>)[]
  @auth.Getter authenticated: boolean

  meta: {

  }

  mounted() {
    console.log(this.items)
  }
}
</script>

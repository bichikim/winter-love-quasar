<template lang="pug">
  q-drawer.side-navigation(:value="value" @input="$emit('input', $event)" v-bind="$attrs")
    q-list
      side-navigation-list(@click="$emit('click', $event)" :items="items")
</template>

<script lang="ts">
  import {
    Component, Mixins, Prop,
  } from 'vue-property-decorator'
  import NavigationShare from './NavigationShare'
  @Component({
    components: {
      SideNavigationList: () => (import('./SideNavigationList.vue')),
    },
  })
  export default class SideNavigation<R> extends Mixins(NavigationShare) {
    @Prop({default: true}) value: boolean
  }
</script>

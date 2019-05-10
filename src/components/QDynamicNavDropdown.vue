<template lang="pug">
  q-btn-dropdown(
    :label="label"
    :to="item.to"
    @Click="item.action && act()"
    expand-icon="ion-arrow-dropdown"
    flat stretch
    v-if="item.items"
    v-show="isShow"
  )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-nav-item(:item="nextItem" :key="index" @to="handleNavTo" @act="handleNavAction")
  q-btn(v-else flat  :icon="item.icon" :label="label" v-show="isShow")
</template>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator'
  import QDynamicNavItem from './QDynamicNavItem.vue'
  import NavDynamicMixin from './NavDynamic.mixin'

  @Component({
    components: {
      QDynamicNavItem,
    },
  })
  export default class QDynamicDropdown extends Mixins(NavDynamicMixin) {
  }
</script>

<style scoped>

</style>
